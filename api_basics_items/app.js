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

//Endpoint - get user por su id
app.get('/users/:id', (req, res) => {
    const {id} = req.params;

    const user = users.find(usr => usr.id === id);

    if (!user) {
        return res.status(404).json({
            message: `User with the ID: '${id}' wasnt found`
        });
    }

    const catalog = user.items.map(idItem => items.find(item => item.id === idItem));

    res.status(200).json({
        message: "User found",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            items: catalog
        }
    });
});