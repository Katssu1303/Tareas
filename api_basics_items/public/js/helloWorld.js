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

getItemById(1);
getItemById(6);