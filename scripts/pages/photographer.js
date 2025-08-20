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

//Afficher le prix journalier des photographers + likes
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

// Affichage photographe + médias
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

    mediasData = photographerMedias.slice();

    // Affichage des médias
    const mediasContainer = document.getElementById("medias-container");
    mediasContainer.innerHTML = "";

    //parcourir les médias
    photographerMedias.forEach((media, index) => {
        // on passe index + callback d’ouverture à la factory
        mediasContainer.appendChild(
            mediaFactory(media, { index, onOpen: openLightbox }).getMediaCardDOM()
        );
    });

    // Créer et afficher l’encart tarif + likes
    createPriceCard();
}

displayPhotographerInfo();

// ======== Lightbox =========
let currentIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const mainWrapper = document.getElementById("main-wrapper");
    const imgEl = document.getElementById("lightbox-image");
    const videoEl = document.getElementById("lightbox-video");
    const titleEl = document.getElementById("lightbox-title");

    const media = mediasData[index];
    const file = media.image
        ? `assets/photographers/media/${media.photographerId}/${media.image}`
        : `assets/photographers/media/${media.photographerId}/${media.video}`;

    if (media.image) {
        imgEl.src = file;
        imgEl.alt = media.title;
        imgEl.style.display = "block";
        videoEl.style.display = "none";
    } else {
        videoEl.src = file;
        videoEl.style.display = "block";
        imgEl.style.display = "none";
    }

    titleEl.textContent = media.title;

    lightbox.classList.add("active");
    lightbox.removeAttribute("aria-hidden"); // ne pas cacher la lightbox
    mainWrapper.setAttribute("aria-hidden", "true");

    currentIndex = index;

    // Donne le focus au bouton fermer
    document.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const mainWrapper = document.getElementById("main-wrapper");

    lightbox.classList.remove("active");
    mainWrapper.setAttribute("aria-hidden", "false");
}

function showNext() {
    currentIndex = (currentIndex + 1) % mediasData.length;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + mediasData.length) % mediasData.length;
    openLightbox(currentIndex);
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".lightbox-close")) closeLightbox();
    if (e.target.closest(".lightbox-next")) showNext();
    if (e.target.closest(".lightbox-prev")) showPrev();
});

document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
});


export { updateLikeCard };

