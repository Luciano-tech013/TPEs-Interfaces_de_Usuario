const btns = document.querySelectorAll(".home__carrousell__card__footer__button__buy");
let btn_content; let card_price;

btns.forEach(btn => {
    btn.addEventListener("mouseover", () => {
        card_price = btn.parentElement.querySelector(".card__price");
        btn_content = btn.innerHTML;
        btn.innerHTML = card_price.innerHTML;
    })
});

btns.forEach(btn => {
    btn.addEventListener("mouseout", () => {
        btn.innerHTML = btn_content;
    })
})