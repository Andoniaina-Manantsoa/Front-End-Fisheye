import { updateLikeCard } from './photographer.js';

function mediaFactory(media) {
    const { title, image, video, likes, photographerId } = media;
    const file = image ? `assets/photographers/media/${photographerId}/${image}` : `assets/photographers/media/${photographerId}/${video}`;

    let hasLiked = false;//Savoir si déjà liké

    function getMediaCardDOM() {
        const article = document.createElement("article");

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