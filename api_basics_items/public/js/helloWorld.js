async function deleteUserById(id) {
    const URL = `http://localhost:7500/users/${id}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log('User was deleted succesfully:');
        console.log(`ID: ${data.user.id}`);
        console.log(`Name: ${data.user.name}`);
        console.log(`Email: ${data.user.email}`);
    } else if (response.status === 404) {
        const data = await response.json();
        console.log('User was not found:');
        console.log(data.message);
    }
}


deleteUserById(1);  
deleteUserById(5); 