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

//Endpoint - delete item by id
app.delete('/items/:id', (req, res) =>{
    const id = parseInt(req.params.id);

    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `The item with the ID: '${id}' was not found so it cant be deleted`
        });
    }

    const deleteItem = items.splice(index, 1)[0];

    res.status(200).json({
        message: `The item with the ID: '${id}' was deleted successfully`,
        item: deleteItem
    });
});