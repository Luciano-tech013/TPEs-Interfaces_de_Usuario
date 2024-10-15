const containers = document.querySelectorAll(".home__carrousell__small");
const cardWidth = card => {
    (card.getBoundingClientRect().width * 5) + 10*5; 
}

let arrow_left; let arrow_right; let cards; let currentIndex = 0;

containers.forEach(container => {
    arrow_left = container.previousElementSibling;
    arrows_right = container.nextElementSibling;

    arrow_left.addEventListener("click", () => {
        currentIndex--;
        
        cardWidth(container.children[0]);
        container.style.transform = `translate(${cardWidth * currentIndex}px)`;
        container.style.transition = `transform 0.7s`;
        
    })
    arrows_right.addEventListener("click", () => {
        currentIndex++;

        cardWidth(container.children[0]);
        container.style.transform = `translate(${cardWidth * currentIndex}px)`;
        container.style.transition = `transform 0.7s`;
    })
});
