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

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Function to update icon
function updateThemeIcon(isLight) {
    if (isLight) {
        // Sun Icon
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        // Moon Icon
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
    updateThemeIcon(true);
}

// Toggle Event
themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
});
