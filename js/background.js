/**
 * GRID INTERACTIVE BACKGROUND
 * A futuristic grid that reacts to mouse movement.
 */

class InteractiveGrid {
    constructor() {
        this.canvas = document.getElementById('grid-bg');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.mouse = { x: -1000, y: -1000 };
        this.cellSize = 40;
        this.gap = 40;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.points.forEach(p => {
            const dx = this.mouse.x - p.originX;
            const dy = this.mouse.y - p.originY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;
            
            if (dist < maxDist) {
                const angle = Math.atan2(dy, dx);
                const force = (maxDist - dist) / maxDist;
                
                // Pushing effect
                p.x = p.originX - Math.cos(angle) * force * 15;
                p.y = p.originY - Math.sin(angle) * force * 15;
                p.opacity = 0.1 + force * 0.5;
                p.size = 2 + force * 3;
            } else {
                p.x += (p.originX - p.x) * 0.1;
                p.y += (p.originY - p.y) * 0.1;
                p.opacity += (0.1 - p.opacity) * 0.1;
                p.size += (2 - p.size) * 0.1;
            }
            
            this.ctx.fillStyle = `rgba(204, 255, 0, ${p.opacity})`; // Neon Lime
            this.ctx.beginPath();
            // Draw a small square
            this.ctx.rect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveGrid();
});
