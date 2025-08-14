//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from '../templates/photographer.js';
import { mediaFactory } from '../templates/media.js';

//Récuperer les donner avec fetch
async function getData() {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    return data;
}

//Afficher sur le URL l'id du photographers
function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

let dailyRate = 0;

//Afficher le prix journalier des photographers
function createPriceCard() {
    if (!document.getElementById("price-card")) {
        const priceCard = document.createElement("div");
        priceCard.id = "price-card";

        const likesSpan = document.createElement("span");
        likesSpan.id = "total-likes";

        const rateSpan = document.createElement("span");
        rateSpan.id = "daily-rate";
        rateSpan.textContent = `${dailyRate}€ / jour`;

        priceCard.appendChild(likesSpan);
        priceCard.appendChild(rateSpan);
        document.body.appendChild(priceCard);
    }
    updateLikeCard();
}

function updateLikeCard() {
    const likesEl = document.getElementById("total-likes");
    if (likesEl) {
        const totalLikes = mediasData.reduce((sum, media) => sum + media.likes, 0);
        likesEl.innerHTML = `${totalLikes} <i class="fa fa-heart"></i>`;
    }
}

let mediasData = [];

async function displayPhotographerInfo() {
    const data = await getData();

    const photographerId = getPhotographerIdFromUrl();

    const photographer = data.photographers.find(p => p.id === photographerId);

    // Récupérer le tarif journalier
    dailyRate = photographer.price;

    //Afficher les infos photographe
    const header = document.querySelector("#photographer-info");
    const template = photographerTemplate(photographer);
    const infoDOM = template.getPhotographerHeaderDOM();
    header.appendChild(infoDOM);

    // récupérer les médias depuis data
    const photographerMedias = data.media.filter(m => m.photographerId === photographerId);

    mediasData = [];

    // Affichage des médias
    const mediasContainer = document.getElementById("medias-container");
    mediasContainer.innerHTML = "";

    //parcourir les médias
    photographerMedias.forEach(media => {
        mediasData.push(media);
        mediasContainer.appendChild(mediaFactory(media).getMediaCardDOM());
    });

    // Créer et afficher l’encart tarif + likes
    createPriceCard();
}

displayPhotographerInfo();

export { updateLikeCard };

