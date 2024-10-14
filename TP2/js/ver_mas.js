const arrows_container = document.querySelectorAll(".home__carrousell__card__footer__icon");

let content;
let container_afectado;

arrows_container.forEach(arrow => {
    arrow.addEventListener("click", (e) => {
        e.stopPropagation();
        arrow.children[0].classList.toggle("home__carrousell__card__footer__icon__active");

        container_afectado = e.target.parentNode.parentNode;
        content = container_afectado.parentNode.nextElementSibling;
        
        if(content) {
            content.classList.toggle("home__carrousell__large__card__content__active");
            container_afectado.classList.toggle("home__carrousell__large__card__footer__content__active");
        }
    })
})

