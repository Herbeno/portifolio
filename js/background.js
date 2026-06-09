class InteractiveGrid {
    constructor() {
        this.canvas = document.getElementById('grid-bg');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.mouse = { x: -1000, y: -1000 };
        this.cellSize = 40;
        this.gap = 35; // Reduzi o gap para ter mais bolinhas na tela
        this.isVisible = true;
        
        this.init();
        this.setupObservers();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    setupObservers() {
        // Pause animation when canvas is not visible to save CPU
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(this.canvas);
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.cols = Math.ceil(this.canvas.width / this.gap) + 1;
        this.rows = Math.ceil(this.canvas.height / this.gap) + 1;
        
        this.points = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.points.push({
                    x: x * this.gap,
                    y: y * this.gap,
                    originX: x * this.gap,
                    originY: y * this.gap,
                    size: 2,
                    opacity: 0.1
                });
            }
        }
    }
    animate() {
        if (!this.isVisible) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const isLightMode = document.documentElement.classList.contains('light-mode');
        
        // No modo claro, forçamos um verde mais escuro e opaco se a variável falhar
        const accentColor = isLightMode ? '#748e00' : '#ccff00';

        this.points.forEach(p => {
            const dx = this.mouse.x - p.originX;
            const dy = this.mouse.y - p.originY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 220; // Raio de influência maior

            if (dist < maxDist) {
                const angle = Math.atan2(dy, dx);
                const force = (maxDist - dist) / maxDist;

                p.x = p.originX - Math.cos(angle) * force * 35; // Empurrão mais forte
                p.y = p.originY - Math.sin(angle) * force * 35;

                // Opacidade máxima quando o mouse está em cima
                const baseOpacity = isLightMode ? 0.5 : 0.2;
                p.opacity = baseOpacity + force * 0.7;
                p.size = 4 + force * 8; // Bolinhas crescem muito mais
            } else {
                const targetOpacity = isLightMode ? 0.25 : 0.15;
                p.x += (p.originX - p.x) * 0.1;
                p.y += (p.originY - p.y) * 0.1;
                p.opacity += (targetOpacity - p.opacity) * 0.1;
                p.size += (3 - p.size) * 0.1; // Tamanho base maior (3px)
            }

            this.ctx.beginPath();
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = accentColor;
            
            // Círculo perfeito
            this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1.0;
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveGrid();
});
