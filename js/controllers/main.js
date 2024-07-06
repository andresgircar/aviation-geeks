import { serviceImages } from "../services/images-services.js";

/*Conexión con API*/
const galleryContainer = document.querySelector('[data-gallery]');
const form = document.querySelector("[data-form]");
const busqueda = document.querySelector("[data-search]");

function createCard(manufacturer, model, url) {
    const card = document.createElement("div");
    card.classList.add('card');

    card.innerHTML = `
        <div class="manufacturer">
            <h2>${manufacturer}</h2>
        </div>
        <img src="${url}" alt="">
        <div class="info-container">
            <h4>${model}</h4>
            <a href="">
                <img src="img/delete-icon.webp" alt="">
            </a>
        </div>
    `

    galleryContainer.appendChild(card);
    return card
}

/*Renderizado de lista*/
const render = async () => {
    try {
        const mainList = await serviceImages.imagesList();
        
        mainList.forEach(element => {
            galleryContainer.appendChild(createCard(element.manufacturer, element.model, element.url));
        });

    } catch (error) {
        galleryContainer.innerHTML= "<h2 class='error-message'>No fue posible conectarse al servidor</h2>";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const manufacturer = document.querySelector("[data-manufacturer]").value;
    const model = document.querySelector("[data-model]").value;
    const url = document.querySelector("[data-url]").value;

    console.log(manufacturer, model, url);

    serviceImages.newImage(manufacturer, model, url);
})

render();

/*Función búsqueda*/
async function filtrarElemento(event) {
    event.preventDefault();

    const terminoBusqueda = busqueda.value;
    const resultadoBusqueda = await serviceImages.searchImage(terminoBusqueda);

    console.log(resultadoBusqueda);

    while (galleryContainer.firstChild){
        galleryContainer.removeChild(galleryContainer.firstChild)
    };

    resultadoBusqueda.forEach(card => galleryContainer.appendChild(createCard(card.manufacturer, card.model, card.url)));

    if(resultadoBusqueda.length == 0){
        resultadoBusqueda.innerHTML = `<h2 class="error-message">No se encontraron elementos para "${terminoBusqueda}"</h2>`
    }
}

busqueda.addEventListener('keydown', (event) => {
    if (event.key === "Enter"){
        filtrarElemento(event)
    }
})

/*Toggle de formulario*/
const formToggleButton = document.querySelector('#form-toggle');
const formSection = document.querySelector("[data-form-section]");
formToggleButton.addEventListener('click', () => {
    formSection.classList.toggle('toggle-form');
    galleryContainer.classList.toggle('toggle-gallery');
    if (formToggleButton.textContent === "+"){
        formToggleButton.textContent = "x";
    } else {
        formToggleButton.textContent = "+";
    }
})