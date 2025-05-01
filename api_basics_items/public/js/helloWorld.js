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