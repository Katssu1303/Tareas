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
    fs.readFile('./public/html/hello_server.html', 'utf8', 
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

//Endpoint - actualizar ususario por id
app.patch('/users/:id', (req, res) =>{
    const {id} = req.params;
    const updates = req.body;

    const user = users.find(usr => usr.id === id);

    if (!user) {
        return res.status(404).json({
            message: `The user with the ID: '${id}' was not found`
        });
    }

    const attributes = ['name', 'email', 'items'];
    let changes = {};

    attributes.forEach(row => {
        if (updates[row]) {
            if (row === 'items') {

                const itemsExist = updates.items.every(idItem =>
                    items.find(item => item.id === idItem)
                );
                if (!itemsExist) {
                    return res.status(400).json({
                        message: "One or more item IDs provided do not exist in the catalog"
                    });
                }
            }
            user[row] = updates[row];
            changes[row] = updates[row];
        }
    });

    res.status(200).json({
        message: `The user with the ID: '${id}' was updated succesfully`,
        changesDone: changes,
        updateUser: user
    });
});