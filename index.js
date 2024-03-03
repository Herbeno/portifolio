// Visibilidade do footer
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        // Rolando para baixo
        document.getElementById("rodape").classList.add("esconder");
    } else {
        // Rolando para cima
        document.getElementById("rodape").classList.remove("esconder");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
