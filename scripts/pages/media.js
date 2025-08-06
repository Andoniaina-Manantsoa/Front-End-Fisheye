function mediaFactory(media) {
    console.log(media);
    const { title, image, video, likes, photographerId } = media;
    const file = image ? `assets/photographers/media/${photographerId}/${image}` : `assets/photographers/media/${photographerId}/${video}`;
    console.log(file);

    function getMediaCardDOM() {
        const article = document.createElement("article");
        console.log("miditra getMEdiaCardDOM");

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

        const titleEl = document.createElement("h3");
        titleEl.textContent = title;

        const likesEl = document.createElement("span");
        likesEl.textContent = `${likes} ♥`;
        likesEl.classList.add("media-likes");

        article.appendChild(mediaElement);
        article.appendChild(titleEl);
        article.appendChild(likesEl);

        return article;
    }

    return { getMediaCardDOM };
}

export { mediaFactory };