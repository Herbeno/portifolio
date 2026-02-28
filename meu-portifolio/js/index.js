// KPIs animados
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;
        const increment = target / 100;

        if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = `+${target}`;
        }
    };
    updateCounter();
});

function toggleGaleria() {
    const galeria = document.getElementById("galeria-ecommerce");

    if (galeria.style.display === "flex") {
        galeria.style.display = "none";
    } else {
        galeria.style.display = "flex";
    }
} 

// Gráfico Demo
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: 'Performance Comercial',
            data: [120, 190, 300, 250, 400],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0'
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#e2e8f0' }
            },
            y: {
                ticks: { color: '#e2e8f0' }
            }
        }
    }
});