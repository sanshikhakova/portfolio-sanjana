/** Updates the top scroll progress indicator bar using transform scaleX. */
function updateScrollProgress(bar) {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  bar.style.transform = `scaleX(${ratio})`;
}

/** Highlights the navigation link matching the currently visible section. */
function initScrollspy(links) {
  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        links.forEach((link) => link.setAttribute('aria-current', String(link.getAttribute('href') === id)));
      }
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
}

/** Traps Tab key focus inside the open mobile drawer. */
function trapDrawerFocus(event, drawer, toggle) {
  if (event.key !== 'Tab' || drawer.hidden) return;
  const items = [toggle, ...drawer.querySelectorAll('a, button')];
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/** Initializes scroll progress, scrollspy, and accessible mobile menu drawer. */
export function initNav() {
  const bar = document.getElementById('scroll-progress');
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = [...document.querySelectorAll('.site-nav__link')];

  if (bar) {
    updateScrollProgress(bar);
    window.addEventListener('scroll', () => updateScrollProgress(bar), { passive: true });
  }
  initScrollspy(navLinks);
  if (!toggle || !drawer) return;

  const setOpen = (open) => {
    drawer.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (!open) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(drawer.hidden));
  drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) setOpen(false);
    trapDrawerFocus(event, drawer, toggle);
  });
}