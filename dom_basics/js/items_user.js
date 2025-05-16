//Crear Items desde inputs
async function registerItemsButton() {
  const URL = "http://localhost:7600/items";

  const data = {
    id: parseInt(document.getElementById("idItem").value),
    name: document.getElementById("nameItem").value,
    type: document.getElementById("typeItem").value,
    effect: document.getElementById("effectItem").value,
  };
  //alert(JSON.stringify(data));
  const validResponse = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(await validResponse.json());
  console.log("Status:", validResponse.status);
}

//Obtener todos los items
async function obtainItemsButton() {
  const idItem = document.getElementById("idSearchItem").value;
  //alert(typeof idItem);
  itemList.innerHTML = "";

  if (idItem === "") {
    // Obtener todos los items
    //const response = await fetch("http://localhost:7600/items");
    const response = await fetch("http://localhost:7600/items", {
      method: "GET",
      cache: "no-store",
    });

    if (response.status === 200) {
      const data = await response.json();
      data.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}, Effect: ${item.effect}`;
        itemList.appendChild(li);

        alert(itemList);
      });
    } else {
      const error = await response.json();
      const li = document.createElement("li");
      li.textContent = `${error.message}`;
      itemList.appendChild(li);
    }
  } else {
    const response = await fetch(`http://localhost:7600/items/${idItem}`);
    if (response.status === 200) {
      const data = await response.json();
      const item = data.item;
      const li = document.createElement("li");
      li.textContent = `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}, Effect: ${item.effect}`;
      itemList.appendChild(li);
    } else {
      const error = await response.json();
      const li = document.createElement("li");
      li.textContent = `${error.message}`;
      itemList.appendChild(li);
    }
  }
}

//Borrar item por su ID
async function deleteItemButton() {
  const idItem = document.getElementById("idDeleteItem").value;
  const URL = `http://localhost:7600/items/${id}`;

  if (idItem === "") {
    alert("Ingresa el ID del item a eliminar");
  }

  const response = await fetch(URL, {
    method: "DELETE",
  });
  if (response.status === 200) {
    const data = await response.json();
    alert(`Item eliminado: ${data.name}`);
  } else {
    const error = await response.json();
    alert(`${error.message}`);
  }
}

//Actualizar item por su ID
async function updateItemButton() {
  const URL = `http://localhost:7600/items/${id}`;

  const exist = await fetch(URL);
  if (exist.status === 404) {
    const error = await exist.json();
    alert(`Error: ${error.message}`);
    return;
  }

  const name = document.getElementById("newItemName").value;
  const type = document.getElementById("newItemtype").value;
  const effect = document.getElementById("newItemEffect").value;

  const newData = {};
  if (name !== "") updates.name = name;
  if (type !== "") updates.type = type;
  if (effect !== "") updates.effect = effect;

  //alert(JSON.stringify(newData));
  const response = await fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (response.status === 200) {
    const data = await response.json();
    alert(
      "Item actualizado correctamente:\n" +
        `ID: ${data.updatedItem.id}\n` +
        `Nombre: ${data.updatedItem.name}\n` +
        `Tipo: ${data.updatedItem.type}\n` +
        `Efecto: ${data.updatedItem.effect}`
    );
  } else {
    const error = await response.json();
    alert("Error al actualizar:\n" + error.message);
  }
}

//Registrar usuario desde input
async function registerUserButton() {
  const URL = "http://localhost:7600/items";

  const data = {
    id: parseInt(document.getElementById("idItem").value),
    name: document.getElementById("nameItem").value,
    type: document.getElementById("typeItem").value,
    effect: document.getElementById("effectItem").value,
  };
  //alert(JSON.stringify(data));
  const validResponse = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(await validResponse.json());
  console.log("Status:", validResponse.status);
}

//Obtener todos los usuarios
async function obtainUserButton() {
  const idItem = document.getElementById("idSearchUser").value;
  //alert(typeof idItem);
  itemList.innerHTML = "";

  if (idItem === "") {
    // Obtener todos los items
    //const response = await fetch("http://localhost:7600/items");
    const response = await fetch("http://localhost:7600/items", {
      method: "GET",
      cache: "no-store",
    });

    if (response.status === 200) {
      const data = await response.json();
      data.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}, Effect: ${item.effect}`;
        itemList.appendChild(li);

        alert(itemList);
      });
    } else {
      const error = await response.json();
      const li = document.createElement("li");
      li.textContent = `${error.message}`;
      itemList.appendChild(li);
    }
  } else {
    const response = await fetch(`http://localhost:7600/items/${idItem}`);
    if (response.status === 200) {
      const data = await response.json();
      const item = data.item;
      const li = document.createElement("li");
      li.textContent = `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}, Effect: ${item.effect}`;
      itemList.appendChild(li);
    } else {
      const error = await response.json();
      const li = document.createElement("li");
      li.textContent = `${error.message}`;
      itemList.appendChild(li);
    }
  }
}

//Borrar usuario por su ID
async function deleteUserButton() {
  const idUser = document.getElementById("idDeleteItem").value;
  const URL = `http://localhost:7600/items/${id}`;

  if (idUser === "") {
    alert("Ingresa el ID del usuario a eliminar");
  }

  const response = await fetch(URL, {
    method: "DELETE",
  });
  if (response.status === 200) {
    const data = await response.json();
    alert(`Usuario eliminado: ${data.name}`);
  } else {
    const error = await response.json();
    alert(`${error.message}`);
  }
}

//Actualizar usuario por su ID
async function updateUserButton() {
  const URL = `http://localhost:7600/items/${id}`;

  const exist = await fetch(URL);
  if (exist.status === 404) {
    const error = await exist.json();
    alert(`Error: ${error.message}`);
    return;
  }

  const name = document.getElementById("newUserName").value;
  const type = document.getElementById("newUsertype").value;
  const effect = document.getElementById("newUserEffect").value;

  const newData = {};
  if (name !== "") updates.name = name;
  if (type !== "") updates.type = type;
  if (effect !== "") updates.effect = effect;

  //alert(JSON.stringify(newData));
  const response = await fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (response.status === 200) {
    const data = await response.json();
    alert(
      "Item actualizado correctamente:\n" +
        `ID: ${data.updatedItem.id}\n` +
        `Nombre: ${data.updatedItem.name}\n` +
        `Tipo: ${data.updatedItem.type}\n` +
        `Efecto: ${data.updatedItem.effect}`
    );
  } else {
    const error = await response.json();
    alert("Error al actualizar:\n" + error.message);
  }
}
