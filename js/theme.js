const STORAGE_KEY = 'sg-theme';

/** Applies the chosen theme and updates toggle ARIA state. */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', label);
  });
}

/** Animates a circular View Transition expanding from the clicked toggle button. */
function transitionTheme(nextTheme, trigger) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced || !trigger) {
    applyTheme(nextTheme);
    return;
  }
  const rect = trigger.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(nextTheme));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
      { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}

/** Binds light/dark toggle buttons and syncs initial ARIA labels. */
export function initTheme() {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  applyTheme(current);
  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      transitionTheme(next, btn);
    });
  });
}