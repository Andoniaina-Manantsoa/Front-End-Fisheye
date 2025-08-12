// Afficher la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

// Fermer la modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none";

        // Réinitialiser le formulaire
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// Attacher les événements seulement si les éléments existent
const closeBtn = document.querySelector('#close_contact');
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

const sendBtn = document.querySelector('.send_contact');
if (sendBtn) {
    sendBtn.addEventListener('click', function () {
        alert("Message envoyé ✅");

        const form = document.querySelector('.contact');
        if (form) form.reset();

        closeModal();
    });
}

export { displayModal };
