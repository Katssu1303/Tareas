async function getItems(){
    const URL = 'http://localhost:7500/items';

    const response = await fetch(URL);

    if(response.status === 200){
        const data = await response.json();
        console.log(data.items);
    }else if (response.status === 404){
        const error = await response.json();
        console.log(error.message);
    }
}

getItems();