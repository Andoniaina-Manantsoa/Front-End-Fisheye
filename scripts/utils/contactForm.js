document.addEventListener("DOMContentLoaded", () => {
    const openContact = document.querySelector(".contact_button");
    const closeContact = document.getElementById("close_contact");
    const modal = document.getElementById("contact_modal");
    const sendContact = document.querySelector(".send_contact");

    if (openContact) {
        openContact.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if (closeContact) {
        closeContact.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (sendContact) {
        sendContact.addEventListener("click", () => {
            alert("Formulaire envoyé");
        });
    }
});

/*document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("contact_button")) {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
    }

    if (e.target.id === "close_contact") {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }
});*/

// Afficher la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
