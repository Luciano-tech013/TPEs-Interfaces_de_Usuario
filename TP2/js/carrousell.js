const arrow_left = document.querySelector(".home__carrousell__large__arrow__left").addEventListener("click", e => moveToLeft());
const arrow_right = document.querySelector(".home__carrousell__large__arrow__right").addEventListener("click", e => moveToRight());
const cards = document.querySelectorAll(".home__carrousell__large__card");

let operacion_right = 0;
let operacion_left = 0;
let counter = 0;

function moveToRight() {
    if(counter > cards.length-1) {
        counter = 0;
        operacion_right = 0; let i = 0;
        while(i < cards.length) {
            cards[i].style.transform = `translate(${operacion_right}%)`; i++;
        }
    } else {
        counter++;

        operacion_right = operacion_right + 107.5; let i = 0;
        while(i < cards.length) {
            cards[i].style.transform = `translate(${operacion_right}%)`; i++;
        }
    }
}

function moveToLeft() {
    counter--;
    if(counter < 0) {
        counter = cards.length-1;
        operacion_left = 107.5 * (cards.length-1);
        let i = 0;
        while(i < cards.length) {
            cards[i].style.transform = `translate(-${operacion_left}%)`; i++;
        }
    } else {
        operacion_left += 107.5;
        let i = 0;
        while(i < cards.length) {
            cards[i].style.transform = `translate(-${operacion_left}%)`; i++;
        }
    }
}