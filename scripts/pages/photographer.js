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

//Fonction affichage erreur 
function displayError(message) {
    const main = document.getElementById("main-wrapper") || document.body;
    main.innerHTML = ""; // vide le contenu existant

    const container = document.createElement("div");
    container.classList.add("error-message");

    const title = document.createElement("h2");
    title.textContent = "Erreur";

    const p = document.createElement("p");
    p.textContent = message;

    const link = document.createElement("a");
    link.href = "index.html";
    link.textContent = "← Retour à l’accueil";

    container.appendChild(title);
    container.appendChild(p);
    container.appendChild(link);

    main.appendChild(container);
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
let sortedMedias = [];

async function displayPhotographerInfo() {
    const data = await getData();
    const photographerId = getPhotographerIdFromUrl();

    // Vérifie si l’ID est valide (nombre et existant)
    if (!photographerId || isNaN(photographerId)) {
        displayError("L'identifiant du photographe est invalide.");
        return;
    }

    const photographer = data.photographers.find(p => p.id === photographerId);

    if (!photographer) {
        displayError("Aucun photographe trouvé avec cet identifiant.");
        return;
    }

    // Récupérer le tarif journalier
    dailyRate = photographer.price;

    //Afficher les infos photographe
    const header = document.querySelector("#photographer-info");
    const template = photographerTemplate(photographer);
    const infoDOM = template.getPhotographerHeaderDOM();
    header.appendChild(infoDOM);

    // récupérer les médias depuis data
    const photographerMedias = data.media.filter(m => m.photographerId === photographerId);

    mediasData = photographerMedias.slice();

    // Initialise sortedMedias à l’ordre original
    sortedMedias = [...mediasData];

    // Affichage des médias
    const mediasContainer = document.getElementById("medias-container");
    mediasContainer.innerHTML = "";

    sortedMedias.forEach((media, index) => {
        mediasContainer.appendChild(
            mediaFactory(media, { index, onOpen: openLightbox }).getMediaCardDOM()
        );
    });

    // Créer et afficher l’encart tarif + likes
    createPriceCard();
}

displayPhotographerInfo();

// ======= Trier les médias======
//Afficher les tries lors du clique sur l'icon fa-bars
const menuButton = document.getElementById("menu-button");
const trieButton = document.querySelector(".trie-button");
const boutons = document.querySelectorAll(".btn-trier");

// Afficher/masquer le menu
menuButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Empêche la propagation vers le document
    trieButton.classList.toggle("active");
    menuButton.classList.toggle("hidden"); // Cache ou montre l'icône
});

// Clic sur un bouton de tri => ferme le menu et réaffiche l'icône
boutons.forEach(btn => {
    btn.addEventListener("click", () => {
        trieButton.classList.remove("active");
        menuButton.classList.remove("hidden");
    });
});

// Clic en dehors => ferme le menu et réaffiche l'icône
document.addEventListener("click", (e) => {
    if (!e.target.closest(".filtres")) {
        trieButton.classList.remove("active");
        menuButton.classList.remove("hidden"); // Attention à bien utiliser "hidden"
    }
});

// Trier les media
const trieButtons = document.querySelectorAll(".btn-trier");
const mediaContainer = document.getElementById("medias-container");

trieButtons.forEach(button => {
    button.addEventListener("click", () => {
        const criter = button.textContent.toLowerCase(); // "popularité", "date", "titre"
        const articles = Array.from(mediaContainer.children);

        articles.sort((a, b) => {
            if (criter === "popularité") {
                return b.dataset.likes - a.dataset.likes; // du plus grand au plus petit
            } else if (criter === "date") {
                return new Date(b.dataset.date) - new Date(a.dataset.date); // du plus récent au plus ancien
            } else if (criter === "titre") {
                return a.dataset.title.localeCompare(b.dataset.title); // ordre alphabétique
            }
        });

        // Réorganise les éléments dans le DOM
        articles.forEach(article => mediaContainer.appendChild(article));

        // 🔥 Met à jour sortedMedias selon le nouvel ordre
        sortedMedias = articles.map(article => {
            const id = article.dataset.id;
            return mediasData.find(m => m.id == id);
        });
    });
});

// ======== Lightbox =========
let currentIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const mainWrapper = document.getElementById("main-wrapper");
    const imgEl = document.getElementById("lightbox-image");
    const videoEl = document.getElementById("lightbox-video");
    const titleEl = document.getElementById("lightbox-title");

    const media = sortedMedias[index];
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
    currentIndex = (currentIndex + 1) % sortedMedias.length;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + sortedMedias.length) % sortedMedias.length;
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


export { updateLikeCard, sortedMedias };

