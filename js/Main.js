document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // REVEAL ON SCROLL
    // =========================

    var sections = document.querySelectorAll("section");
    var reveals = document.querySelectorAll(".reveal");

    sections.forEach(function (section) {
        section.classList.add("section-hidden");
    });

    function revealOnScroll() {
        var trigger = window.innerHeight * 0.85;

        sections.forEach(function (section) {
            var top = section.getBoundingClientRect().top;
            if (top < trigger) {
                section.classList.remove("section-hidden");
            }
        });

        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < trigger) {
                el.classList.add("active");
            }
        });
    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    // =========================
    // SMOOTH SCROLL
    // =========================

    function scrollToSection(targetId) {
        var targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        var headerOffset = window.innerWidth <= 480 ? 70 : 100;
        var elementPosition = targetSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Nav desktop
    var navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToSection(link.getAttribute('href'));
        });
    });

    // =========================
    // MENÚ MÓVIL (hamburguesa)
    // =========================

    var hamburgerBtn = document.getElementById('hamburger-btn');
    var navMobile = document.getElementById('nav-mobile');
    var navMobileClose = document.getElementById('nav-mobile-close');

    // Crear overlay
    var navOverlay = document.createElement('div');
    navOverlay.className = 'nav-mobile-overlay';
    document.body.appendChild(navOverlay);

    function openMobileNav() {
        navMobile.classList.add('open');
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navMobile.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openMobileNav);
    navMobileClose.addEventListener('click', closeMobileNav);
    navOverlay.addEventListener('click', closeMobileNav);

    // Links del nav móvil
    var navMobileLinks = document.querySelectorAll('.nav-mobile a');
    navMobileLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            closeMobileNav();
            setTimeout(function () {
                scrollToSection(link.getAttribute('href'));
            }, 300);
        });
    });

});