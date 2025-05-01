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

//Endpoint - update item
app.patch('/items/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const item = items.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({
            message: `The item with the ID: '${id}'  was not found`
        });
    }

    const allowedData = ['name', 'type', 'effect'];
    let changes = {};

    allowedData.forEach(row =>{
        if(updates[row]){
            item[row] = updates[row];
            changes[row] = updates[row];
        }
    });

    res.status(200).json({
        message: `The item with the ID: '${id}' was updated succesfully`,
        change: changes,
        updatedItem: item
    });
});