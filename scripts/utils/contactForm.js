document.addEventListener("DOMContentLoaded", () => {
    const openContact = document.querySelector(".contact_button");
    const closeContact = document.getElementById("close_contact");
    const modal = document.getElementById("contact_modal");
    const sendContact = document.querySelector(".send_contact");

    openContact.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeContact.addEventListener("click", () => {
        modal.style.display = "none";
    });

    sendContact.addEventListener("click", () => {
        alert("Formulaire envoyé");
    });
});

// Afficher la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
