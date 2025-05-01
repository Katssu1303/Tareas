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

//Endpoint - borrar user por id
app.delete('/users/:id', (req, res) =>{
    const id = parseInt(req.params.id);

    const index = users.findIndex(usr => usr.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `User with the ID: '${id}' was not found`
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.status(200).json({
        message: `User with the ID: '${id}' was deleted succesfully`,
        user: deletedUser
    });

});