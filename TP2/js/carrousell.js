/*CONTENEDOR DE LAS CARDS*/
const container_cards_races = document.querySelector("#cards_races");
const container_cards_accion = document.querySelector("#cards_accion")
const container_cards_adventura = document.querySelector("#cards_adventura");
/*CARDS DEL CONTENEDOR*/
const cards_races = Array.from(document.querySelectorAll(".home__carrousell__card__race"));
const cards_accion = Array.from(document.querySelectorAll(".home__carrousell__card__accion"));
const cards_adventura = Array.from(document.querySelectorAll(".home__carrousell__card__adventura"));
/*MAX DE CARDS DEL CONTENEDOR*/
const max_cards_races = cards_races.length;
const max_cards_accion = cards_accion.length;
const max_cards_adventura = cards_adventura.length;
/*CARD PRINCIPAL DE CADA CARROUSELL*/
const card_principal_race = document.querySelector("#card_principal_race");
const card_principal_accion = document.querySelector("#card_principal_accion");
const card_principal_adventura = document.querySelector("#card_principal_adventura");
/*INDICE DE LA CARD PRINCIPAL*/
let index_card_principal_race = cards_races.indexOf(card_principal_race);
let index_card_principal_accion = cards_accion.indexOf(card_principal_accion);
let index_card_principal_adventura = cards_adventura.indexOf(card_principal_adventura);
/*VALOR DEL TRANSLATE QUE SE ACUMULA POR CADA CLICK SUCESIVO*/
let operacion = 0;
let contador = 0;

const VALOR_TRANSLATE = 3.5; 

const arrow1_left = document.querySelector("#flecha1_left").addEventListener("click", () => {
    moveToLeftRace();
});
const arrow2_right = document.querySelector("#flecha1_right").addEventListener("click", () => {
    moveToRightRace();
});

/*EL PROBLEMA ES QUE SI PASO EL INDICE POR PARAMETRO VUELVE A BUSCAR LA CARD Y 
SE REINICIA EL INDICE NUEVAMENTE, POR LO QUE LA RESTA DE index--; NUNCA SE GUARDA. 
ASI FUNCIONA JS*/
function moveToRightRace() {
    if() {
        
        container_cards_races.style.transform = `translate(${operacion}%)`;
        container_cards_races.style.transition = `transform 0.7s`;
    }
}

function moveToLeftRace() {
    if(index_card_principal_race > 0) {
        index_card_principal_race--;
        operacion += VALOR_TRANSLATE;

        container_cards_races.style.transform = `translate(${operacion}%)`;
        container_cards_races.style.transition = `transform 0.7s`;
    }
}