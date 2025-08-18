import { updateLikeCard } from '../pages/photographer.js';

//Afficher les tries lors du clique sur l'icon fa-bars
document.addEventListener("DOMContentLoaded", () => {
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
});

// Trier les media
document.addEventListener("DOMContentLoaded", () => {
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
        });
    });
});

function mediaFactory(media, { index, onOpen } = {}) {
    const { title, image, video, likes, photographerId } = media;
    const file = image ? `assets/photographers/media/${photographerId}/${image}` : `assets/photographers/media/${photographerId}/${video}`;

    let hasLiked = false;//Savoir si déjà liké

    function getMediaCardDOM() {
        const article = document.createElement("article");

        // Ajouter les data-attributes pour le tri
        article.dataset.likes = media.likes;
        article.dataset.title = media.title;
        article.dataset.date = media.date;

        // Créer le média (img ou video)
        let mediaElement;
        if (image) {
            mediaElement = document.createElement("img");
            mediaElement.setAttribute("src", file);
            mediaElement.setAttribute("alt", title);
        } else if (video) {
            mediaElement = document.createElement("video");
            mediaElement.setAttribute("src", file);
            mediaElement.setAttribute("controls", true);
        }

        // Clic sur image ou vidéo → ouvre Lightbox
        mediaElement.addEventListener("click", () => {
            if (typeof onOpen === "function") onOpen(index);
        });

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("media-info");

        const titleEl = document.createElement("h3");
        titleEl.textContent = title;

        const likesEl = document.createElement("span");
        likesEl.classList.add("media-likes");

        const numberEl = document.createElement("span");
        numberEl.textContent = likes;

        const heartEl = document.createElement("i");
        heartEl.classList.add("fa", "fa-heart");

        // Clic sur cœur
        heartEl.addEventListener("click", () => {
            if (!hasLiked) {
                media.likes++;  // Incrémente le like du média
                numberEl.textContent = media.likes; // Mets à jour l'affichage local
                article.dataset.likes = media.likes;
                hasLiked = true;// Empêcher de liker à nouveau
                updateLikeCard();
            }
        });

        likesEl.appendChild(numberEl);
        likesEl.appendChild(heartEl);

        infoContainer.appendChild(titleEl);
        infoContainer.appendChild(likesEl);

        article.appendChild(mediaElement);
        article.appendChild(infoContainer);

        return article;
    }

    return { getMediaCardDOM };
}

export { mediaFactory };