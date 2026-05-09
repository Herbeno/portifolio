// Intersection Observer for Reveal Animation
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter Animation with Intersection Observer
const counterOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            animateCounter(counter, target);
            observer.unobserve(counter);
        }
    });
}, counterOptions);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    const update = () => {
        current += increment;
        if (current < target) {
            el.innerText = Math.ceil(current);
            requestAnimationFrame(update);
        } else {
            el.innerText = `+${target}`;
        }
    };
    update();
}

// Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".progress-bar").style.width = scrolled + "%";
});

// Smooth Navigation Blur
const nav = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = "1rem 5%";
    } else {
        nav.style.padding = "1.5rem 5%";
    }
});

// Typewriter Effect for Logo
const logo = document.querySelector('.logo');
if (logo) {
    const texts = ["HRB.DATA", "HERBEN OLIVEIRA"];
    let textIndex = 0;
    let charIndex = texts[textIndex].length;
    let isDeleting = true; // Start by deleting the initial text
    let typeSpeed = 150;

    const hasArrow = logo.textContent.includes('←');
    const prefix = hasArrow ? '← ' : '';

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            charIndex--;
            typeSpeed = 80;
        } else {
            charIndex++;
            typeSpeed = 150;
        }

        logo.textContent = prefix + currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 3000; // Pause when word is complete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Initial delay before starting the effect
    setTimeout(type, 3000);
}
