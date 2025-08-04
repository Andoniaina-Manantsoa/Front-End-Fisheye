//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from '../templates/photographer.js';

async function getData() {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    return data;
}

function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

async function displayPhotographerInfo() {
    const data = await getData();
    const photographerId = getPhotographerIdFromUrl();
    const photographer = data.photographers.find(p => p.id === photographerId);
    console.log(photographer);

    const header = document.querySelector("#photographer-info");
    const template = photographerTemplate(photographer);
    const infoDOM = template.getPhotographerHeaderDOM();

    header.appendChild(infoDOM);
}

displayPhotographerInfo();




