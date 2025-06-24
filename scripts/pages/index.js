async function getPhotographers() {
    // Récuperer les Elements JSON
    const reponse = await fetch('./data/photographers.json')
    const photographersData = await reponse.json();
    return (photographersData.photographers)
}

function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/id-photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', picture);

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

        return article;
    }

    return { getUserCardDOM };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();

