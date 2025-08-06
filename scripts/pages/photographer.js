//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from '../templates/photographer.js';
import { mediaFactory } from './media.js';

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
    //console.log(data.media);

    const photographerId = getPhotographerIdFromUrl();

    const photographer = data.photographers.find(p => p.id === photographerId);
    //console.log(photographer);

    const header = document.querySelector("#photographer-info");
    const template = photographerTemplate(photographer);
    const infoDOM = template.getPhotographerHeaderDOM();

    header.appendChild(infoDOM);

    // récupérer les médias depuis data
    const photographerMedias = data.media.filter(m => m.photographerId === photographerId);

    // Affichage des médias
    const mediasContainer = document.getElementById("medias-container");

    //parcourir les médias
    photographerMedias.forEach(media => {
        console.log("parcourir les médias");
        /*const mediaElement = document.createElement("div");
        mediasContainer.appendChild(mediaElement);

        // image
        if (media.image) {
            const img = document.createElement("img");
            img.src = `assets/photographers/media/${media.image}`;
            img.alt = media.title || "media";
            mediaElement.appendChild(img);
        }

        // vidéo
        if (media.video) {
            const video = document.createElement("video");
            video.controls = true;
            video.setAttribute("aria-label", media.title || "media");

            const source = document.createElement("source");
            source.src = `assets/photographers/media/${media.video}`;
            source.type = "video/mp4";

            video.appendChild(source);
            mediaElement.appendChild(video);
        }

        mediasContainer.appendChild(mediaElement);*/

        mediasContainer.appendChild(mediaFactory(media).getMediaCardDOM());

    });
}

displayPhotographerInfo();

