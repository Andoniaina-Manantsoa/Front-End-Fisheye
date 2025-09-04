//Mettre le code JavaScript lié à la page photographer.html
import { mediaFactory } from '../templates/media.js';
import { photographerTemplate } from '../templates/photographer.js';

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
const sortButton = document.getElementById("sort-button");
const sortList = document.querySelector(".trie-button");
const currentSort = document.getElementById("current-sort");
const options = sortList.querySelectorAll("li");
const arrow = sortButton.querySelector(".arrow");
const mediaContainer = document.getElementById("medias-container");

// ==== Ouvrir / fermer le menu avec clic ====
sortButton.addEventListener("click", () => {
    const expanded = sortButton.getAttribute("aria-expanded") === "true";
    sortButton.setAttribute("aria-expanded", !expanded);
    sortList.classList.toggle("hidden");
    arrow.classList.toggle("rotate");
});

// Ouvrir/fermer menu au clavier
sortButton.addEventListener("keydown", (e) => {
    const expanded = sortButton.getAttribute("aria-expanded") === "true";

    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sortButton.click(); // déclenche le toggle du menu
    }

    if (e.key === "ArrowDown" && !expanded) {
        e.preventDefault();
        sortButton.click(); // ouvre le menu
        options[0].focus(); // focus sur la première option
    }
});

// ==== Sélectionner une option (clic + clavier) ====
options.forEach((option, index) => {
    // clic souris
    option.addEventListener("click", () => {
        currentSort.textContent = option.textContent;

        // mettre à jour aria-selected
        options.forEach(opt => opt.setAttribute("aria-selected", "false"));
        option.setAttribute("aria-selected", "true");

        // lancer le tri
        applySort(option.dataset.value);

        // fermer menu
        sortButton.setAttribute("aria-expanded", "false");
        sortList.classList.add("hidden");
        arrow.classList.remove("rotate");
    });

    // navigation clavier
    option.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (index + 1) % options.length;
            options[nextIndex].focus();
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = (index - 1 + options.length) % options.length;
            options[prevIndex].focus();
        }
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            option.click();
            sortButton.focus();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            sortList.classList.add("hidden");
            sortButton.setAttribute("aria-expanded", "false");
            arrow.classList.remove("rotate");
            sortButton.focus();
        }
    });
});

//Fermer si on clique dehors
document.addEventListener("click", (e) => {
    if (!sortButton.contains(e.target) && !sortList.contains(e.target)) {
        sortList.classList.add("hidden");
        sortButton.setAttribute("aria-expanded", "false");
        arrow.classList.remove("rotate");
    }
})
// Fonction de tri
function applySort(criter) {
    const articles = Array.from(mediaContainer.children);

    articles.sort((a, b) => {
        if (criter === "popularité") {
            return b.dataset.likes - a.dataset.likes;
        } else if (criter === "date") {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (criter === "titre") {
            return a.dataset.title.localeCompare(b.dataset.title);
        }
    });

    // Réorganiser les éléments dans le DOM
    articles.forEach(article => mediaContainer.appendChild(article));

    // mettre à jour sortedMedias si nécessaire
    sortedMedias = articles.map(article => {
        const id = article.dataset.id;
        return mediasData.find(m => m.id == id);
    });
}

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


export { sortedMedias, updateLikeCard };

