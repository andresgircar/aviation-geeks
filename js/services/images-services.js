const imagesList = () => {
    return fetch("http://localhost:3000/images")
            .then((res) => res.json())
            .catch((err) => console.log(err));
}

const newImage = (manufacturer, model, url) => {
    return fetch("http://localhost:3000/images", {
        method :'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            manufacturer,
            model,
            url
        })
    })
            .then((res) => res.json())
            .catch((err) => console.log(err));
}

const deleteImage = (manufacturer, model, url) => {
    return fetch("http://localhost:3000/images", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            manufacturer,
            model,
            url
        })
    })
}

async function searchImage(palabraClave){
    const conexion = await fetch(`http://localhost:3000/images?q=${palabraClave}`);
    const conexionConvertida = await conexion.json();
    return conexionConvertida.filter(image => {
        return image.manufacturer.toLowerCase().includes(palabraClave.toLowerCase()) ||
            image.model.toLowerCase().includes(palabraClave.toLowerCase());
        });
}

export const serviceImages = {
    imagesList, newImage, deleteImage, searchImage,
}