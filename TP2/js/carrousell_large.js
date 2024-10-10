const arrow_large_left = document.querySelector(".home__carrousell__large__arrow__left").addEventListener("click", e => moveToLeftLarge());
const arrow_large_right = document.querySelector(".home__carrousell__large__arrow__right").addEventListener("click", e => moveToRightLarge());
let large_cards = Array.from(document.querySelectorAll(".home__carrousell__large__card"));

let cards = document.querySelector(".home__carrousell__large");

const VALOR_TRANSLATE = 107.5;
const MAX = large_cards.length;

let operacion = 0;
let ultimaCard;

function moveToRightLarge() {
    let i = 0;

    while(i < MAX) {
        if(i == 0) {
            firstChild = large_cards.shift();
            large_cards.push(firstChild);
        }
        large_cards[i].style.transform = `translate(-${VALOR_TRANSLATE}%)`; i++;
    }

    //reloadCards(large_cards[0]);
}

function moveToLeftLarge() {
    let i = 0; 

    while(i < MAX) {
        large_cards[i].style.transform = `translate(${VALOR_TRANSLATE}%)`;
        if(i == 0) {
            ultimaCard = large_cards[MAX-1];
            ultimaCard.parentElement.insertBefore(ultimaCard, large_cards[0]);
        }
        i++;
    }
    
    large_cards = document.querySelectorAll(".home__carrousell__large__card");
    //reloadCards(large_cards[0]);
}

function reloadCards(child) {
    setTimeout(() => {
        child.style.transform = `translate(0+107*3)`;
        large_cards = document.querySelectorAll(".home__carrousell__large__card");
    }, 600)
}



