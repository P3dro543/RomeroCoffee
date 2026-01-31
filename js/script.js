// ========================= 
// REVEAL ON SCROLL
// =========================

const sections = document.querySelectorAll("section");
const reveals = document.querySelectorAll(".reveal");

sections.forEach(section => {
    section.classList.add("section-hidden");
});

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < trigger) {
            section.classList.remove("section-hidden");
        }
    });

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("active");
        }
    });
}

revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

// ========================= 
// SMOOTH SCROLL (desktop nav)
// =========================

const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        scrollToSection(link.getAttribute('href'));
    });
});

function scrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const headerOffset = window.innerWidth <= 480 ? 70 : 100;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ========================= 
// MENÚ MÓVIL (hamburguesa)
// =========================

const hamburgerBtn = document.getElementById('hamburger-btn');
const navMobile = document.getElementById('nav-mobile');
const navMobileClose = document.getElementById('nav-mobile-close');

// Crear overlay dinámicamente
const navOverlay = document.createElement('div');
navOverlay.classList.add('nav-mobile-overlay');
document.body.appendChild(navOverlay);

function openMobileNav() {
    navMobile.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

function closeMobileNav() {
    navMobile.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restaurar scroll
}

hamburgerBtn.addEventListener('click', openMobileNav);
navMobileClose.addEventListener('click', closeMobileNav);
navOverlay.addEventListener('click', closeMobileNav);

// Links del nav móvil → scroll + cierre
const navMobileLinks = document.querySelectorAll('.nav-mobile a');

navMobileLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        closeMobileNav();

        // Pequeño delay para que el menú se cierre antes de hacer scroll
        setTimeout(() => {
            scrollToSection(link.getAttribute('href'));
        }, 300);
    });
});