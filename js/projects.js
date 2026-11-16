/** Filters project cards by tag and announces the count via aria-live. */
function filterProjects(tag, cards, statusEl) {
  let shown = 0;
  cards.forEach((card) => {
    const tags = (card.dataset.tags || '').split(' ');
    const match = tag === 'all' || tags.includes(tag);
    if (match) {
      shown += 1;
      card.hidden = false;
      requestAnimationFrame(() => card.classList.remove('is-filtering-out'));
    } else {
      card.classList.add('is-filtering-out');
      card.hidden = true;
    }
  });
  if (statusEl) {
    statusEl.textContent = tag === 'all'
      ? `Showing all ${shown} projects`
      : `Showing ${shown} ${shown === 1 ? 'project' : 'projects'} in ${tag}`;
  }
}

/** Wires project filter buttons and accessible <dialog> case-study modals. */
export function initProjects() {
  const filterBtns = [...document.querySelectorAll('.chip--filter')];
  const cards = [...document.querySelectorAll('.project-card')];
  const statusEl = document.getElementById('filter-status');
  let lastTrigger = null;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      filterProjects(btn.dataset.filter || 'all', cards, statusEl);
    });
  });

  document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.dataset.openDialog);
      if (!dialog) return;
      lastTrigger = trigger;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });

  document.querySelectorAll('.case-dialog').forEach((dialog) => {
    const restore = () => {
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    };
    dialog.addEventListener('close', restore);
    dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
}