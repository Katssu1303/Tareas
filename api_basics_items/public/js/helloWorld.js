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