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