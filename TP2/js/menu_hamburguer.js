const menu = document.querySelector(".menu__hamburguer");
const main_container = document.querySelector("main");

const btn_menu = document.querySelector("#btn__menu").addEventListener("click", () => {
    menu.classList.toggle("menu__hamburguer__visibility");
    main_container.classList.toggle("main_visibility");
})