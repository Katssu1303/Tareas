async function createUsers(usersData) {
    const URL = 'http://localhost:7500/users'; 

    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersData)
    });

    if (response.status === 201) {
        const data = await response.json();
        console.log('All users were added successfully:');
        console.log(data.added);
    } else if (response.status === 207) {
        const data = await response.json();
        console.log('Some users were added, but others failed:');
        console.log('Added:', data.added);
        console.log('Failed:', data.fails);
    } else if (response.status === 400) {
        const data = await response.json();
        console.log('Could not add any users:');
        console.log(data.fails);
    }
}

//Valid user
createUsers([
    {
        id: 1,
        name: "Katia",
        email: "katy@gmail.com",
        items: [1, 2]
    }
]);


createUsers([
    {
        id: 2,
        name: "Luka",
        email: "Luka@gmail.com",
        items: [1] //Exist
    },
    {
        id: 3,
        name: "Mario",
        email: "mario@gmail.com",
        items: [6] //Doesnt exist
    }
]);

//Missing email
createUsers([
    {
        id: 4,
        name: "Dey",
        items: [1]
    }
]);
