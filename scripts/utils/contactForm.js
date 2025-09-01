// Afficher la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");

    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // 4. Désactiver le reste de la page
    document.querySelector("main").setAttribute("inert", "");

    // Retirer la classe input-error de tous les champs
    modal.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    // Donner le focus au premier champ du modal
    const firstInput = modal.querySelector("input, textarea");
    if (firstInput) firstInput.focus();
}

// Fermer la modale
function closeModal() {
    const modal = document.getElementById("contact_modal");

    // Réinitialiser le formulaire
    const form = modal.querySelector('form');
    if (form) form.reset();

    // Masquer la modale et réactiver le reste de la page
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.querySelector("main").removeAttribute("inert");

    // Redonner le focus à un élément extérieur (ex: bouton "Contactez-moi")
    const triggerBtn = document.querySelector(".contact_button");
    if (triggerBtn) triggerBtn.focus();
}

// Attacher les événements seulement si les éléments existent
const closeBtn = document.querySelector('#close_contact');
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

const sendBtn = document.querySelector('.send_contact');
if (sendBtn) {//inutile de vérifier si le bouton existe car il est dans le formulaire dans le html
    sendBtn.addEventListener('click', function () {
        // Valider tous les champs avant envoi
        const isFirstValid = validateInput("first");
        const isLastValid = validateInput("last");
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isFirstValid && isLastValid && isEmailValid && isMessageValid) {
            console.log("")
            alert("Message reçus avec succés!");
            closeModal();
        } else {
            alert("Veuillez corriger les champs en rouge avant d'envoyer.");
        }
    });
}

// Ajout des écouteurs une seule fois
document.addEventListener("DOMContentLoaded", () => {//inutile d'attendre le chargement de la page pour ajouter les écouteurs car les éléments sont déjà dans le html
    const first = document.getElementById("first");
    if (first) first.addEventListener("input", () => validateInput("first"));

    const last = document.getElementById("last");
    if (last) last.addEventListener("input", () => validateInput("last"));

    const email = document.getElementById("email");
    if (email) email.addEventListener("input", validateEmail);

    const message = document.getElementById("message");
    if (message) message.addEventListener("input", validateMessage);
});

// Récupération et vérifier les champs à valider
// Vérification Prénom et nom
function validateInput(id) {
    const input = document.getElementById(id);
    if (input.value.trim().length < 2) {
        input.classList.add('input-error');
        return false;
    } else {
        input.classList.remove('input-error');
        return true;
    }
}

//Vérifier email
function validateEmail() {
    const email = document.getElementById("email");
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value.trim())) {
        email.classList.add('input-error');
        return false;
    } else {
        email.classList.remove('input-error');
        return true;
    }
}

//Vérifier message
function validateMessage() {
    const message = document.getElementById("message");
    if (message.value.trim().length < 10) {
        message.classList.add('input-error');
        return false;
    } else {
        message.classList.remove('input-error');
        return true;
    }
}

export { displayModal };
