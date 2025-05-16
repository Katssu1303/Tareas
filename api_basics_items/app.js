//Archivo - servidor que va a manejar todas las rutas (API endpoints)

"use strict";

import express from "express";
import fs from "fs";
import cors from "cors";

const port = 7600;

const app = express();

app.use(cors());

//Guardar items y usuarios
const items = [];
const users = [];

app.use(express.json());

app.use(express.static("./public"));

//Para que no mande status 304
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-store");
//   next();
// });

//Endpoint - cargar pagina
app.get("/", (req, res) => {
  fs.readFile("./public/html/helloWorld.html", "utf8", (err, html) => {
    if (err) {
      res.status(500).send(`There was an error: ` + err);
      return;
    }

    console.log("Sending page...");
    res.send(html);
    console.log("Page sent!");
  });
});

//Enpoint - pruebas DOM
app.get("/test", (req, res) => {
  fs.readFile(
    "./public/dom_basics/html/items_users.html",
    "utf8",
    (err, html) => {
      if (err) {
        res.status(500).send(`There was an error: ` + err);
        return;
      }

      console.log("Sending page...");
      res.send(html);
      console.log("Page sent!");
    }
  );
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

//End point - create items
app.post("/items", (req, res) => {
  const newItems = req.body;
  //Convertirlo en array
  const itemsList = Array.isArray(newItems) ? newItems : [newItems];

  const addedItems = [];
  const failedItems = [];

  itemsList.forEach((item) => {
    const { id, name, type, effect } = item;
    if (!id || !name || !type || !effect) {
      failedItems.push({ item, cause: "Lack of attributes" });
      return;
    }

    const exist = items.find((existingItem) => existingItem.id === id);
    if (exist) {
      failedItems.push({ item, cause: "Item with the same ID already exists" });
      return;
    }

    items.push(item);
    addedItems.push(item);
  });

  if (addedItems.length === 0) {
    res.status(400).json({
      message: "No items could be added",
      fails: failedItems,
    });
  } else if (failedItems.length > 0) {
    res.status(207).json({
      message: "Some items were added but others failled",
      added: addedItems,
      fails: failedItems,
    });
  } else {
    res.status(201).json({
      message: "All items were added",
      added: addedItems,
    });
  }
});

//Endpoint - get all items
app.get("/items", (req, res) => {
  if (items.length === 0) {
    return res.status(404).json({
      message: "Theres no items",
    });
  }

  res.status(200).json({
    message: "Items found",
    items: items,
  });
});

//Endpoint - get item by id
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const itemFound = items.find((item) => item.id === id);

  if (!itemFound) {
    return res.status(404).json({
      message: `Item with ID: ${id} wasn't found`,
    });
  }

  res.status(200).json({
    message: "Item found",
    item: itemFound,
  });
});

//Endpoint - update item
app.patch("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const item = items.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({
      message: `The item with the ID: '${id}'  was not found`,
    });
  }

  const allowedData = ["name", "type", "effect"];
  let changes = {};

  allowedData.forEach((row) => {
    if (updates[row]) {
      item[row] = updates[row];
      changes[row] = updates[row];
    }
  });

  res.status(200).json({
    message: `The item with the ID: '${id}' was updated succesfully`,
    change: changes,
    updatedItem: item,
  });
});

//Endpoint - delete item by id
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `The item with the ID: '${id}' was not found so it cant be deleted`,
    });
  }

  const deleteItem = items.splice(index, 1)[0];

  res.status(200).json({
    message: `The item with the ID: '${id}' was deleted successfully`,
    item: deleteItem,
  });
});

//Endpoint - registrar usuarios
app.post("/users", (req, res) => {
  const newUser = req.body;

  const usersList = Array.isArray(newUser) ? newUser : [newUser];

  const addedUsers = [];
  const failedUsers = [];

  usersList.forEach((user) => {
    const { id, name, email, items: itemsUser } = user;

    if (!id || !name || !email || !itemsUser) {
      failedUsers.push({ user, cause: "Lack of attributes" });
      return;
    }

    const existUser = users.find((usr) => usr.id === id);

    if (existUser) {
      failedUsers.push({ user, cause: "User with the same ID already exists" });
      return;
    }

    //Verifica si todos los IDs en itemsUser existen en items
    const allItemsExist = itemsUser.every((idItem) =>
      items.find((item) => item.id === idItem)
    );

    if (!allItemsExist) {
      failedUsers.push({ user, cause: "The item isnt on the catalog" });
      return;
    }

    users.push({
      id,
      name,
      email,
      items: itemsUser,
    });

    addedUsers.push(user);
  });

  if (addedUsers.length === 0) {
    res.status(400).json({
      message: "Couldnt add any users",
      fails: failedUsers,
    });
  } else if (failedUsers.length > 0) {
    res.status(207).json({
      message: "Some users were added but others failed",
      added: addedUsers,
      fails: failedUsers,
    });
  } else {
    res.status(201).json({
      message: "All users were added successfully",
      added: addedUsers,
    });
  }
});

//Endpoint - get user
app.get("/users", (req, res) => {
  if (users.length === 0) {
    return res.status(404).json({
      message: "There arent any users",
    });
  }

  const userItems = users.map((user) => {
    const catalog = user.items.map((idItem) =>
      items.find((item) => item.id === idItem)
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      items: catalog,
    };
  });

  res.status(200).json({
    message: "Users found",
    users: userItems,
  });
});

//Endpoint - get user por su id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((usr) => usr.id === id);

  if (!user) {
    return res.status(404).json({
      message: `User with the ID: '${id}' wasnt found`,
    });
  }

  const catalog = user.items.map((idItem) =>
    items.find((item) => item.id === idItem)
  );

  res.status(200).json({
    message: "User found",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      items: catalog,
    },
  });
});

//Endpoint - borrar user por id
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex((usr) => usr.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `User with the ID: '${id}' was not found`,
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    message: `User with the ID: '${id}' was deleted succesfully`,
    user: deletedUser,
  });
});

//Endpoint - actualizar ususario por id
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const user = users.find((usr) => usr.id === id);

  if (!user) {
    return res.status(404).json({
      message: `The user with the ID: '${id}' was not found`,
    });
  }

  const attributes = ["name", "email", "items"];
  let changes = {};

  attributes.forEach((row) => {
    if (updates[row]) {
      if (row === "items") {
        const itemsExist = updates.items.every((idItem) =>
          items.find((item) => item.id === idItem)
        );
        if (!itemsExist) {
          return res.status(400).json({
            message:
              "One or more item IDs provided do not exist in the catalog",
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
    updateUser: user,
  });
});
