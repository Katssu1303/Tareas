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

//Endpoint - get item by id
app.get('/items/:id', (req, res) =>{
    const {id} = req.params;

    const itemFound = items.find(item => item.id === id);

    if(!itemFound){
        return res.status(404).json({
            message: `Item with ID: ${id} wasn't found`
        });
    }

    res.status(200).json({
        message: "Item found",
        item: itemFound
    });
});

//Endpoint - delete item by id
app.delete('/items/:id', (req, res) =>{
    const {id} = req.params;

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

//Endpoint - update item
app.patch('/items/:id', (req, res)=> {
    const {id} = req.params;
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

//Endpoint - get user
app.get('/users', (req, res) =>{
    if (users.length === 0) {
        return res.status(404).json({
            message: "There arent any users"
        });
    }

    const userItems = users.map(user =>{
        const catalog = user.items.map(idItem => 
            items.find(item => item.id === idItem)
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            items: catalog
        };
    });

    res.status(200).json({
        message: "Users found",
        users: userItems
    });
});

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

//Endpoint - borrar user por id
app.delete('/users/:id', (req, res) =>{
    const {id} = req.params;

    const index = users.findIndex(usr => usr.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `User with the ID: '${id}' was not found`
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.status(200).json({
        message: `User with the ID: '${id}'was deleted succesfully`,
        user: deletedUser
    });

});