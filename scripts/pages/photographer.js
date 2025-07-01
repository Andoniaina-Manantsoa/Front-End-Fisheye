//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersAndMedias() {
    // Récuperer les Elements JSON
    const reponse = await fetch('./data/photographers.json')
    const photographersData = await reponse.json();
    const photographers = photographersData.photographers;
    const medias = photographersData.media;

}



