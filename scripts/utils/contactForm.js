console.log("contactForm");
const contactButton = document.querySelector(".contact_button");
console.log(contactButton);
contactButton.addEventListener("click", () => alert("contacter"));
function displayModal() {
    console.log("contactez-nous");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
