function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/id-photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Portrait de ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');

        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.classList.add('photographer-tagline');

        const tarif = document.createElement('p');
        tarif.textContent = `${price} €/jour`;
        tarif.classList.add('photographer-price');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(tarif);

        //  Créer le lien pour les cartes
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${photographer.id}`);
        link.setAttribute('aria-label', `Voir la page de ${name}`);
        link.appendChild(article);

        return link;
    }

    //fonction pour le header du photographe
    function getPhotographerHeaderDOM() {
        const container = document.createElement('div');
        container.classList.add('photographer-infos');

        // Div pour le texte
        const textContainer = document.createElement('div');
        textContainer.classList.add('photographer-text');

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');

        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.classList.add('photographer-tagline');

        textContainer.appendChild(h1);
        textContainer.appendChild(location);
        textContainer.appendChild(tag);

        // le bouton
        const contactButton = document.createElement('button');
        contactButton.textContent = "Contactez-moi";
        contactButton.classList.add('contact_button');
        contactButton.addEventListener('click', displayModal);

        // Div pour l'image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('photographer-img');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Portrait de ${name}`);

        imageContainer.appendChild(img);

        // Assemble les deux parties dans le container principal
        container.appendChild(textContainer);
        container.appendChild(contactButton);
        container.appendChild(imageContainer);

        return container;
    }

    return { getUserCardDOM, getPhotographerHeaderDOM };
}

export { photographerTemplate };
