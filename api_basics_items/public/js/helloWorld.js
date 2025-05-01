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