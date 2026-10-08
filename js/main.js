/* =============================================
   main.js
   Sets up the mobile menu, scrolling, active navigation,
   footer year, contact form, and project card effects.
   ============================================= */

document.addEventListener('sectionsLoaded', () => {
    initMobileMenuAutoClose();
    initSmoothScroll();
    initActiveNavHighlight();
    initFooterYear();
    initContactForm();
    initProjectCardSpotlight();
    initProjectFilters();
    initNetworkLab();
    initLocalTime();
    initCopyEmailButton();
    initEmailLinkFallback();
});

/* ---------------------------------------------
   1. MOBILE MENU AUTO-CLOSE
   Close the mobile menu after a navigation link is selected.
   --------------------------------------------- */
function initMobileMenuAutoClose() {
    const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
    const navCollapse = document.getElementById('navMenu');
    if (!navLinks.length || !navCollapse) return;

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            // Close the menu only when it is currently open.
            if (navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
}

/* ---------------------------------------------
   2. SMOOTH SCROLL
   Scroll smoothly to each section and account for the fixed navbar.
   --------------------------------------------- */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) return;

    // Offset the destination so the fixed navbar does not cover it.
    const navbar = document.getElementById('mainNavbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ---------------------------------------------
   3. ACTIVE NAV HIGHLIGHT
   Highlight the navigation link for the section in view.
   --------------------------------------------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.4, rootMargin: '-70px 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------
   4. FOOTER YEAR
   Keep the copyright year current automatically.
   --------------------------------------------- */
function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
}

/* ---------------------------------------------
   5. CONTACT FORM
   Show a demo success message; this form has no backend yet.
   --------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check that every required field contains a value.
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }

        });

        if (!isValid) return;

        // Reset the demo form and show its success message.
        form.reset();
        form.classList.add('success');

        // Create the message element the first time the form is submitted.
        let msg = form.querySelector('.form-message');
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'form-message';
            form.appendChild(msg);
        }

        msg.textContent = 'Salamat! Your message has been received. (Demo only — no backend yet.)';
        msg.classList.add('show', 'success');

        // Remove the success styling after five seconds.
        setTimeout(() => {
            form.classList.remove('success');
            msg.classList.remove('show');
        }, 5000);
    });

    // Clear validation styling as the user edits a field.
    form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => {
            field.classList.remove('is-invalid');
        });
    });
}

/* ---------------------------------------------
   6. PROJECT CARD SPOTLIGHT
   Gently follows the pointer without affecting touch.
   --------------------------------------------- */
function initProjectCardSpotlight() {
    const cards = document.querySelectorAll('.featured-card, .project-card:not(.project-card-cta)');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
            card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.removeProperty('--pointer-x');
            card.style.removeProperty('--pointer-y');
        });
    });
}

/* Filter the secondary project cards while keeping featured work in view. */
function initProjectFilters() {
    const buttons = document.querySelectorAll('[data-project-filter]');
    const projects = document.querySelectorAll('.project-filter-item[data-project-category]');
    const status = document.querySelector('.project-filter-status');
    if (!buttons.length || !projects.length || !status) return;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.projectFilter;
            let visibleCount = 0;

            buttons.forEach((filterButton) => {
                const isSelected = filterButton === button;
                filterButton.classList.toggle('active', isSelected);
                filterButton.setAttribute('aria-pressed', String(isSelected));
            });

            projects.forEach((project) => {
                const isVisible = selectedCategory === 'all'
                    || project.dataset.projectCategory === selectedCategory;
                project.hidden = !isVisible;
                if (isVisible) visibleCount++;
            });

            const categoryLabels = {
                design: 'UI/UX design projects',
                web: 'web app projects',
                programming: 'programming projects'
            };
            status.textContent = selectedCategory === 'all'
                ? `Showing all ${visibleCount} projects`
                : `Showing ${visibleCount} ${categoryLabels[selectedCategory] || 'projects'}`;
        });
    });
}

/* Let visitors inspect network devices and trace an illustrative route. */
function initNetworkLab() {
    const lab = document.querySelector('.network-lab-card');
    if (!lab) return;

    const nodes = Array.from(lab.querySelectorAll('[data-network-node]'));
    const traceButton = lab.querySelector('[data-network-trace]');
    const detailTitle = lab.querySelector('.network-detail-title');
    const detailDescription = lab.querySelector('.network-detail-description');
    const status = lab.querySelector('[data-network-status]');
    if (!nodes.length || !traceButton || !detailTitle || !detailDescription || !status) return;

    const traceTimers = [];
    const routeNames = nodes.map((node) => node.querySelector('.network-node-name')?.textContent.trim());

    function stopTrace() {
        traceTimers.forEach((timer) => window.clearTimeout(timer));
        traceTimers.length = 0;
        nodes.forEach((node) => node.classList.remove('is-packet-active'));
        traceButton.disabled = false;
    }

    nodes.forEach((node) => {
        node.addEventListener('click', () => {
            stopTrace();
            nodes.forEach((item) => {
                const isSelected = item === node;
                item.classList.toggle('is-selected', isSelected);
                item.setAttribute('aria-pressed', String(isSelected));
            });

            detailTitle.textContent = node.dataset.nodeTitle;
            detailDescription.textContent = node.dataset.nodeDescription;
            status.textContent = 'Select another device or trace the example route.';
        });
    });

    traceButton.addEventListener('click', () => {
        stopTrace();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            status.textContent = `Example route complete: ${routeNames.join(' → ')}.`;
            return;
        }

        traceButton.disabled = true;
        nodes.forEach((node) => {
            node.classList.remove('is-selected');
            node.setAttribute('aria-pressed', 'false');
        });

        nodes.forEach((node, index) => {
            const timer = window.setTimeout(() => {
                nodes.forEach((item) => item.classList.remove('is-packet-active'));
                node.classList.add('is-packet-active');
                status.textContent = `Packet at ${routeNames[index]} (${index + 1} of ${nodes.length}).`;

                if (index === nodes.length - 1) {
                    const finishTimer = window.setTimeout(() => {
                        nodes.forEach((item) => item.classList.remove('is-packet-active'));
                        node.classList.add('is-selected');
                        node.setAttribute('aria-pressed', 'true');
                        detailTitle.textContent = node.dataset.nodeTitle;
                        detailDescription.textContent = node.dataset.nodeDescription;
                        traceButton.disabled = false;
                        traceTimers.length = 0;
                        status.textContent = `Example route complete: ${routeNames.join(' → ')}.`;
                    }, 500);
                    traceTimers.push(finishTimer);
                }
            }, index * 550);
            traceTimers.push(timer);
        });
    });
}

/* Display the current time in the portfolio owner's local time zone. */
function initLocalTime() {
    const timeElement = document.getElementById('localTime');
    if (!timeElement) return;

    const timeFormatter = new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    function updateLocalTime() {
        const now = new Date();
        timeElement.dateTime = now.toISOString();
        timeElement.textContent = timeFormatter.format(now);
    }

    updateLocalTime();
    window.setInterval(updateLocalTime, 60_000);
}

/* Copy the contact email only when the visitor explicitly asks. */
function initCopyEmailButton() {
    const button = document.querySelector('.copy-email-button');
    const status = document.getElementById('copyEmailStatus');
    if (!button || !status) return;

    button.addEventListener('click', async () => {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            status.textContent = 'Copy is unavailable here; please select the email address.';
            return;
        }

        try {
            await navigator.clipboard.writeText('azialanicole09@gmail.com');
            status.textContent = 'Email copied.';
        } catch (error) {
            status.textContent = 'Could not copy; please select the email address.';
            console.warn('Could not copy the contact email:', error);
        }
    });
}

/* Copy the address as a fallback when no mail application is configured. */
function initEmailLinkFallback() {
    const emailLink = document.querySelector('.hero-email-link');
    const feedback = document.getElementById('emailFeedback');
    if (!emailLink || !feedback) return;

    emailLink.addEventListener('click', () => {
        feedback.textContent = 'Opening your email app…';
        if (!navigator.clipboard) return;

        navigator.clipboard.writeText('azialanicole09@gmail.com')
            .then(() => {
                feedback.textContent = 'Email address copied. You can paste it into your mail app.';
            })
            .catch((error) => {
                feedback.textContent = 'If your email app did not open, email azialanicole09@gmail.com.';
                console.warn('Could not copy the email address:', error);
            });
    });
}