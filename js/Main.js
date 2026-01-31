document.addEventListener('DOMContentLoaded', function() {

    // =========================
    // REVEAL ON SCROLL
    // =========================

    var sections = document.querySelectorAll("section");
    var reveals = document.querySelectorAll(".reveal");

    sections.forEach(function(section) {
        section.classList.add("section-hidden");
    });

    function revealOnScroll() {
        var trigger = window.innerHeight * 0.85;

        sections.forEach(function(section) {
            var top = section.getBoundingClientRect().top;
            if (top < trigger) {
                section.classList.remove("section-hidden");
            }
        });

        reveals.forEach(function(el) {
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
        var target = document.querySelector(targetId);
        if (!target) return;

        var headerOffset = window.innerWidth <= 480 ? 70 : 100;
        var start = window.pageYOffset;
        var end = target.getBoundingClientRect().top + start - headerOffset;
        var duration = 800;
        var startTime = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeOutCubic(progress);

            window.scrollTo(0, start + (end - start) * eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    // Nav desktop
    var navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(link.getAttribute('href'));
        });
    });

    // =========================
    // MENÚ MÓVIL (hamburguesa)
    // =========================

    var btn = document.getElementById('hamburger-btn');
    var nav = document.getElementById('nav-mobile');
    var close = document.getElementById('nav-mobile-close');
    var overlay = document.getElementById('overlay');

    btn.addEventListener('click', function() {
        nav.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', function() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Links del nav móvil
    var mobileLinks = nav.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(function() {
                scrollToSection(link.getAttribute('href'));
            }, 300);
        });
    });

});