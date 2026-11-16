/** Reveals elements smoothly once they enter the viewport. */
function initScrollReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
}

/** Updates cursor-tracking spotlight CSS variables on fine-pointer cards. */
function initSpotlightCards() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.spotlight-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  });
}

/** Starts scroll reveal and spotlight card interactions. */
export function initReveal() {
  initScrollReveal();
  initSpotlightCards();
}