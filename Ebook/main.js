// Simple interactivity for the Prototype

console.log("Ebook Prototype Loaded Successfully");

// Animation activation on scroll (simple reveal effect)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
        }
    });
}, observerOptions);

// Select elements to reveal
document.querySelectorAll('section > div').forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'translate-y-10', 'opacity-0');
    observer.observe(el);
});

// Table of Contents smoothing
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
