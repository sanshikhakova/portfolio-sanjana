/** Displays a brief accessible toast notification. */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(Number(toast.dataset.timerId || 0));
  const timerId = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
  toast.dataset.timerId = String(timerId);
}

/** Copies text to clipboard using the Clipboard API with textarea fallback. */
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

/** Assembles the mailto address client-side and binds the Copy email button. */
export function initContact() {
  const link = document.getElementById('email-link');
  const copyBtn = document.getElementById('copy-email-btn');
  if (!link || !copyBtn) return;

  const email = `${link.dataset.user}@${link.dataset.domain}`;
  link.href = `mailto:${email}`;
  link.textContent = email;

  copyBtn.addEventListener('click', async () => {
    try {
      await copyText(email);
      showToast(`Copied ${email} to clipboard`);
    } catch {
      showToast(`Email: ${email}`);
    }
  });
}