async function getUsers(){
    const URL = 'http://localhost:7500/users';

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

getUsers();