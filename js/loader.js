/* =============================================
   loader.js
   Loads HTML sections from /sections/ folder
   into their placeholder <div data-section="...">
   ============================================= */

// Wait until DOM is ready before doing anything
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
});

/**
 * Main entry point — finds all section placeholders
 * and fetches their content in parallel.
 */
async function initLoader() {
    const placeholders = document.querySelectorAll('[data-section]');
    const loaderScreen = document.getElementById('loader');

    // Map each placeholder to a fetch promise
    const loadPromises = Array.from(placeholders).map((el) => {
        const name = el.dataset.section; // e.g. "navbar", "hero"
        return loadSection(name, el);
    });

    try {
        // Wait for all sections to load before revealing the page
        await Promise.all(loadPromises);
        onAllSectionsLoaded(loaderScreen);
    } catch (err) {
        console.error('Section loading failed:', err);
        onAllSectionsLoaded(loaderScreen); // still reveal to avoid blank page
    }
}

/**
 * Fetches a single section file and injects its HTML.
 * @param {string} name - section filename (no extension)
 * @param {HTMLElement} target - placeholder element
 */
async function loadSection(name, target) {
    const res = await fetch(`sections/${name}.html`);
    if (!res.ok) throw new Error(`Failed to load section: ${name}`);
    target.innerHTML = await res.text();
}

/**
 * Runs after every section is in the DOM.
 * Hides loader, then dispatches a custom event so
 * other scripts (tech-stack.js, animations.js) can start.
 */
function onAllSectionsLoaded(loaderScreen) {
    // Small delay so the loader animation feels intentional, not jarring
    setTimeout(() => {
        loaderScreen.classList.add('loader-hidden');

        // Let the rest of the app know sections are ready
        document.dispatchEvent(new CustomEvent('sectionsLoaded'));
    }, 500);
}