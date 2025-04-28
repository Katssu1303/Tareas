async function getUserByID(id){
    const URL = `http://localhost:7500/users/${id}`;

    const response = await fetch(URL);

    if (response.status === 200) {
        const data = await response.json();
        console.log('User found:');
        console.log(`ID: ${data.user.id}`);
        console.log(`Name: ${data.user.name}`);
        console.log(`Email: ${data.user.email}`);
        console.log('Items:');
        data.user.items.forEach(item => {
            console.log(`  - ${item.name} (${item.type}): ${item.effect}`);
        });
        console.log('-----------------------');
    } else if (response.status === 404) {
        const data = await response.json();
        console.log('User wasnt found:');
        console.log(data.message);
    }

}

getUserByID(1);
getUserByID(5)
