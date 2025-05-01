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

//End point - create items
app.post('/items', (req, res)=>{
    const newItems = req.body;
    //Convertirlo en array
    const itemsList = Array.isArray(newItems) ? newItems : [newItems];

    const addedItems = [];
    const failedItems = [];

    itemsList.forEach(item =>{

        const { id, name, type, effect } = item;
        if(!id || !name || !type || !effect){
            failedItems.push({item, cause: "Lack of attributes"});
            return;
        }

        const exist = items.find(existingItem => existingItem.id === id);
        if(exist){
            failedItems.push({item, cause: "Item with the same ID already exists"});
            return;
        }

        items.push(item);
        addedItems.push(item);
    });

    if(addedItems.length === 0){
        res.status(400).json({
            message: "No items could be added", 
            fails: failedItems
        });
    }else if(failedItems.length > 0){
        res.status(207).json({
            message: "Some items were added but others failled",
            added: addedItems,
            fails: failedItems
        });
    }else{
        res.status(201).json({
            message: "All items were added",
            added: addedItems
        });
    }
});
    
//Endpoint - get all items
app.get('/items', (req, res) =>{
    if(items.length === 0){
        return res.status(404).json({
            message: "Theres no items"
        });
    }

    res.status(200).json({
        message: "Items found",
        items: items
    });
});