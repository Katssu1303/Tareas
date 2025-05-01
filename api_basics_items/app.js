//Archivo - servidor que va a manejar todas las rutas (API endpoints)

"use strict";

import express from "express";
import fs from 'fs'

const port = 7600;

const app = express()

//Guardar items y usuarios
const items = [];
const users = []; 

app.use(express.json())

app.use(express.static('./public'))

//Endpoint - cargar pagina
app.get('/', (req, res)=>{
    fs.readFile('./public/html/helloWorld.html', 'utf8', 
    (err, html) =>{
        if(err)
        {
            res.status(500).send(`There was an error: ` + err)
            return
        }

        console.log("Sending page...")
        res.send(html)
        console.log("Page sent!")
        })
})

app.listen(port, ()=>{
    console.log(`App listening on port: ${port}`)
})

//Endpoint - registrar usuarios
app.post('/users', (req, res) =>{
    const newUser = req.body;

    const usersList = Array.isArray(newUser) ? newUser : [newUser];

    const addedUsers = [];
    const failedUsers = [];

    usersList.forEach(user=>{
        const {id, name, email, items: itemsUser} = user;

        if (!id || !name || !email || !itemsUser){
            failedUsers.push({user, cause: "Lack of attributes"});
            return
        }

        const existUser = users.find(usr => usr.id === id);

        if(existUser){
            failedUsers.push({user, cause: "User with the same ID already exists"});
            return
        }

        //Verifica si todos los IDs en itemsUser existen en items
        const allItemsExist = itemsUser.every(idItem => items.find(item => item.id === idItem));

        if(!allItemsExist){
            failedUsers.push({user, cause: "The item isnt on the catalog"});
            return
        }

        users.push({
            id, name, email, items: itemsUser
        });

        addedUsers.push(user);
    })

    if (addedUsers.length === 0) {
        res.status(400).json({
            message: "Couldnt add any users",
            fails: failedUsers
        });
    } else if (failedUsers.length > 0) {
        res.status(207).json({ 
            message: "Some users were added but others failed",
            added: addedUsers,
            fails: failedUsers
        });
    } else {
        res.status(201).json({
            message: "All users were added successfully",
            added: addedUsers
        });
    }
});