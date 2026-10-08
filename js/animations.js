/* =============================================
   animations.js
   Scroll reveals, typed role, navigation scroll effect, and back-to-top button.
   Wait for "sectionsLoaded" before initializing.
   ============================================= */

document.addEventListener('sectionsLoaded', () => {
    initScrollReveal();
    initTypedRole();
    initNavbarScroll();
    initScrollProgress();
    initBackToTop();
});

/* ---------------------------------------------
   1. SCROLL REVEAL
   Add .revealed when an element enters the viewport.
   --------------------------------------------- */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // IntersectionObserver: efficient scroll detection
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Reveal each element only once.
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------
   2. TYPED ROLE ANIMATION (Hero)
   Type each role character by character, then move to the next role.
   --------------------------------------------- */
function initTypedRole() {
    const target = document.getElementById('typedRole');
    if (!target) return;

    const roles = [
        'Web Developer',
        'Network Administrator',
        'BSIT Student',
        'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Typing and deletion speeds, in milliseconds.
    const TYPE_SPEED = 90;
    const DELETE_SPEED = 45;
    const PAUSE_END = 1600; // Wait before deleting a completed role.
    const PAUSE_START = 400; // Wait before typing the next role.

    function tick() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Add one character while typing.
            charIndex++;
            target.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                // Pause after the full role has been typed.
                isDeleting = true;
                setTimeout(tick, PAUSE_END);
                return;
            }
            setTimeout(tick, TYPE_SPEED);
        } else {
            // Remove one character while deleting.
            charIndex--;
            target.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                // Move to the next role after deleting this one.
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, PAUSE_START);
                return;
            }
            setTimeout(tick, DELETE_SPEED);
        }
    }

    // Start the first role after a short delay.
    setTimeout(tick, 500);
}

/* ---------------------------------------------
   3. NAVBAR SCROLL EFFECT
   Add .scrolled to apply the glass effect and smaller padding.
   --------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    const SCROLL_THRESHOLD = 60; // Scroll distance before the effect appears.

    function updateNavbar() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // A passive listener avoids blocking scroll input.
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // Apply the correct state on initial load.
}

/* ---------------------------------------------
   4. PAGE SCROLL PROGRESS
   Update a lightweight indicator without measuring on every scroll event.
   --------------------------------------------- */
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    const bar = document.getElementById('scrollProgressBar');
    if (!progress || !bar) return;

    let frameRequested = false;
    let lastValue = -1;

    function updateProgress() {
        frameRequested = false;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const percentage = Math.max(0, Math.min(100, Math.round(ratio * 100)));

        bar.style.transform = `scaleX(${percentage / 100})`;
        if (percentage !== lastValue) {
            progress.setAttribute('aria-valuenow', String(percentage));
            lastValue = percentage;
        }
    }

    function requestProgressUpdate() {
        if (frameRequested) return;
        frameRequested = true;
        window.requestAnimationFrame(updateProgress);
    }

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);
    updateProgress();
}

/* ---------------------------------------------
   5. BACK-TO-TOP VISIBILITY
   Show the button after the visitor scrolls more than 400 pixels.
   --------------------------------------------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const SHOW_AFTER = 400; // Scroll distance before the button appears.

    function updateVisibility() {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    // Smoothly return to the top when clicked.
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}