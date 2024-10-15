const arrow_large_left = document.querySelector(".home__carrousell__large__arrow__left").addEventListener("click", e => moveLargeToLeft());
const arrow_large_right = document.querySelector(".home__carrousell__large__arrow__right").addEventListener("click", e => moveLargeToRight());

let large_cards = document.querySelectorAll(".home__carrousell__large__card__and__content");

let large_card_principal = document.querySelector("#large__card__principal");

let container_large_cards = document.querySelector(".home__carrousell__large");

const VALOR_TRANSLATE = 107;
const MAX = large_cards.length;

let operacion = 0;
let index_large = Array.from(document.querySelectorAll(".home__carrousell__large__card")).indexOf(large_card_principal);
const INDEX_LARGE_CARD = index_large;

function moveLargeToRight() {
    if(index_large < (MAX - INDEX_LARGE_CARD)) {
        index_large++;
        operacion -= VALOR_TRANSLATE;

        for(let large_card of large_cards) {
            large_card.style.transform = `translate(${operacion}%) scale(1.1)`;
            large_card.style.transition = `transform 0.6s`;
        }

        setTimeout(() => {
            for(let large_card of large_cards) {
                large_card.style.transform = `translate(${operacion}%) scale(1)`;
            }
        }, 500)
    }
}

function moveLargeToLeft() {
    if(index_large > 0) {
        index_large--;
        operacion += VALOR_TRANSLATE;

        for(let large_card of large_cards) {
            large_card.style.transform = `translate(${operacion}%) scale(1.1)`;
            large_card.style.transition = `transform 0.6s`;
        }

        setTimeout(() => {
            for(let large_card of large_cards) {
                large_card.style.transform = `translate(${operacion}%) scale(1)`;
            }
        }, 500)
    }
}












