"use strict";

import express from "express";
import fs from 'fs'

const port = 7600;

const app = express()

app.use(express.json())

app.use(express.static('./public'))

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