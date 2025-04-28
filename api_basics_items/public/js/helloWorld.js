async function createItems(){
    const URL = 'http://localhost:7500/items';

    //Items validos
    const data1 = [
        { id: 1, name: "Sword", type: "Weapon", effect: "Deals damage" },
        { id: 2, name: "Shield", type: "Armor", effect: "Blocks attacks" }
    ];

    //Items con falta de atriburos
    const data2 = [
        { id: 3, name: "Potion", type: "Consumable" }, //Falta 'effect'
        { id: 4, name: "Bow", type: "Weapon", effect: "Shoots arrows" }
    ];

    const data3 = [
        { id: 1, name: "Axe", type: "Weapon", effect: "Chops enemies" }, //id:1 ya existe arriba
        { id: 5, name: "Staff", type: "Magic", effect: "Casts spells" }
    ];

    const validResponse = await fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data1)
    });

    console.log(await validResponse.json());
    console.log('Status:', validResponse.status);

    const invalidResponse = await fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data2)
    });

    console.log(await invalidResponse.json());
    console.log('Status:', invalidResponse.status);

    const duplicatedResponse = await fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data3)
    });

    console.log(await duplicatedResponse.json());
    console.log('Status:', duplicatedResponse.status);
}

async function getItems(){
    const URL = 'http://localhost:7500/items';

    const response = await fetch(URL);

    if(response.status === 200){
        const data = await response.json();
        console.log(data.items);
    }else if (response.status === 404){
        const error = await response.json();
        console.log(error.message);
    }
}

async function getItemById(id){
    const URL = 'http://localhost:7500/items';
    const response = await fetch(URL);

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.item);
    } else if (response.status === 404) {
        const error = await response.json();
        console.log(error.message);
    }
}

async function deleteItemById(id){
    const URL = `http://localhost:7500/items/${id}`;

    const response = await fetch(URL, {
        method: 'DELETE'
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.item);
    } else if (response.status === 404) {
        const error = await response.json();
        console.log(error.message);
    } 
}

async function updateItemById(id, updates){
    const URL = `http://localhost:7500/items/${id}`;

    const response = await fetch(URL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates)
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log('The item was correctly updated:');
        console.log('Changes:', data.change);
        console.log('Updated item:', data.updatedItem);
    } else if (response.status === 404) {
        const error = await response.json();
        console.log('The item to update not found:');
        console.log(error.message);
    }
}

async function getUsers(){
    const URL = 'http://localhost:7500/users';

    const response = await fetch(URL);

    if (response.status === 200) {
        const data = await response.json();
        console.log('Users found:');
        data.users.forEach(user => {
            console.log(`ID: ${user.id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log('Items:');
            user.items.forEach(item => {
                console.log(`  - ${item.name} (${item.type}): ${item.effect}`);
            });
            console.log('-----------------------');
        });
    } else if (response.status === 404) {
        const data = await response.json();
        console.log('There arent users registrated:');
        console.log(data.message);
    }
}

createItems()
getItems();
getItems();
getItemById(1);
getItemById(6);
deleteItemById(1);
deleteItemById(6);
updateItemById(2, { name: "New Shield :)", effect: "Blocks and reflects attacks" });
updateItemById(6, { name: "Sword" });
getUsers();

