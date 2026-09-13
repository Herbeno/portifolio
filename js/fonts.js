(function () {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;600;800&display=swap';

    function markFontsLoaded() {
        document.documentElement.classList.add('fonts-loaded');
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.media = 'print';
    link.onload = function () {
        this.media = 'all';
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(markFontsLoaded);
        } else {
            markFontsLoaded();
        }
    };
    document.head.appendChild(link);
})();
