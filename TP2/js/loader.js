const loader = document.querySelector(".container__loader");
const header = document.querySelector(".header");
const container = document.querySelector(".container");
const footer = document.querySelector("footer");

setTimeout(() => {
    loader.classList.add("style__loader__visibility");
    header.classList.add("styles__eliminated__for__loader");
    container.classList.add("styles__eliminated__for__loader");
    footer.classList.add("styles__eliminated__for__loader");
}, 5000);