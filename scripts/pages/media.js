function mediaFactory(media) {
    const { title, image, video, likes } = media;
    const file = image ? `assets/photographers/media/${image}` : `assets/photographers/media/${video}`;

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