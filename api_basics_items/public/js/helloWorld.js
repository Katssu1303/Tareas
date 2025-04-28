async function updateUserById(id, updates){
    const URL = `http://localhost:7500/users/${id}`;

    const response = await fetch(URL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates)
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log('The user was updated succesfully:');
        console.log('Changes:', data.changesDone);
        console.log('User updated:', data.updateUser);
    } else if (response.status === 404) {
        const error = await response.json();
        console.log('The user was not found:');
        console.log(error.message);
    } else if (response.status === 400) {
        const error = await response.json();
        console.log('Error with the data:');
        console.log(error.message);
    }
}

updateUserById(2, {
    name: "Alice", email: "alice@gmail.com"
});
updateUserById(2, {
    items: [1, 2]
});
updateUserById(3, {
    items: [11, 8] //IDs que no existen
});