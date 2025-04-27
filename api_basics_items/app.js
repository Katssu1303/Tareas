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