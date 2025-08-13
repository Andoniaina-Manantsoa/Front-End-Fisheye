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
        alert("Message envoyé");

        const form = document.querySelector('.contact');
        if (form) form.reset();

        closeModal();
    });
}
/*// Récupération et vérifier les champs à valider
document.getElementById("first").addEventListener("input", () => validateInput("first"));
document.getElementById("last").addEventListener("input", () => validateInput("last"));
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("message").addEventListener("textarea", validateMessage);

// Vérifier prénom et nom
function validateInput(id) {
    const input = document.getElementById(id);
    const isValid = input.value.trim().length >= 2;
    return isValid;
}

// Vérifier email
function validateEmail() {
    const email = document.getElementById("email");
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const isValid = emailPattern.test(email.value.trim());
    return isValid;
}

// Vérifier message
function validateMessage() {
    const message = document.getElementById("message");
    const isValid = message.value.trim().length >= 2;
    return isValid;
}

// Attacher l'événement sur le bouton envoyer
const sendBtn = document.querySelector('.send_contact');
if (sendBtn) {
    sendBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Bloque l'envoi par défaut

        // Vérification des champs
        const isFirstValid = validateInput("first");
        const isLastValid = validateInput("last");
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // Si tous les champs sont valides
        if (isFirstValid && isLastValid && isEmailValid && isMessageValid) {
            alert("Message envoyé !");

            // Réinitialiser le formulaire
            const form = document.querySelector('.contact');
            if (form) form.reset();

            // Fermer la modale
            closeModal();
        }
    });
}*/

export { displayModal };
