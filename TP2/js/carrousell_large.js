const arrow_large_left = document.querySelector(".home__carrousell__large__arrow__left").addEventListener("click", e => moveLargeToLeft());
const arrow_large_right = document.querySelector(".home__carrousell__large__arrow__right").addEventListener("click", e => moveLargeToRight());

let large_cards = Array.from(document.querySelectorAll(".home__carrousell__large__card"));

let large_card_principal = document.querySelector("#large__card__principal");

let container_large_cards = document.querySelector(".home__carrousell__large");

const VALOR_TRANSLATE_LARGE = 7;
const MAX_LARGE = large_cards.length;
const MIN = 0;

let operacion_large = 0;
let index_large = large_cards.indexOf(large_card_principal);
let index_large_card = index_large;

function moveLargeToRight() {
    if(index_large < (MAX_LARGE - index_large_card)) {
        index_large++;
        operacion_large -= VALOR_TRANSLATE_LARGE;

        container_large_cards.style.transform = `translate(${operacion_large}%)`;
        container_large_cards.style.transition = `transform 0.7s`;
    }
}

function moveLargeToLeft() {
    if(index_large > MIN) {
        index_large--;
        operacion_large += VALOR_TRANSLATE_LARGE;

        container_large_cards.style.transform = `translate(${operacion_large}%)`;
        container_large_cards.style.transition = `transform 0.7s`;
    }
}












