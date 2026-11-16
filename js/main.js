import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';
import { initHeroArt } from './hero-art.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

/** Sets the current year in the footer copyright line. */
function setFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/** Bootstraps all progressive-enhancement modules once DOM is ready. */
function initApp() {
  initTheme();
  initNav();
  initReveal();
  initHeroArt();
  initProjects();
  initContact();
  setFooterYear();
}

initApp();