const loader = document.querySelector(".container__loader");
const header = document.querySelector(".header");
const container = document.querySelector(".container");
const footer = document.querySelector("footer");

const loader_number = document.getElementById("loader__number");
let counter = 0;

setTimeout(() => {
    loader.classList.add("style__loader__visibility");
    header.classList.add("styles__eliminated__for__loader");
    container.classList.add("styles__eliminated__for__loader");
    footer.classList.add("styles__eliminated__for__loader");
}, 5000);

const load = setInterval(() => {
    console.log("ENTRE");
    if(counter < 100) {
        counter++;
        loader_number.innerHTML = `${counter}%`;
    } else {
        clearInterval(load);
    }
}, 47);

