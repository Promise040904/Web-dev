// 1. Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// 2. Language toggle (English / Sepedi)
// Add more keys here and a matching data-i18n="key" in the HTML.
// Have a Sepedi speaker proofread every string before you submit.
const st = {
  'nav-home': 'Gae',
  'nav-about': 'Ka ga rena',
  'nav-menu': 'Lenaneo',
  'nav-gallery': 'Difoto',
  'nav-contact': 'Ikgokaganye le rena'
};

const langToggle = document.getElementById('lang-toggle');
const translatable = document.querySelectorAll('[data-i18n]');
let current = 'en';

translatable.forEach(el => { el.dataset.en = el.textContent; });

langToggle.addEventListener('click', () => {
  current = current === 'en' ? 'st' : 'en';
  translatable.forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = current === 'st' && st[key] ? st[key] : el.dataset.en;
  });
  document.documentElement.lang = current === 'st' ? 'nso' : 'en';
  langToggle.textContent = current === 'st' ? 'English' : 'Sepedi';
});

// 3. "Open now" message based on the visitor's clock
const statusEl = document.getElementById('open-status');

function updateStatus() {
  if (!statusEl) return;
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const minutes = now.getHours() * 60 + now.getMinutes();

  let open = null, close = null;
  if (day >= 1 && day <= 5) { open = 6 * 60 + 30; close = 17 * 60; }
  else if (day === 6)       { open = 7 * 60;      close = 14 * 60; }

  const isOpen = open !== null && minutes >= open && minutes < close;
  statusEl.textContent = isOpen ? 'We are open now.' : 'We are closed right now.';
}
updateStatus();

// 4. Contact form validation (runs only on the contact page)
const form = document.getElementById('contact-form');

if (form) {
  const fields = [
    { id: 'name',    check: v => v.trim() !== '',                       msg: 'Please enter your name.' },
    { id: 'email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),  msg: 'Please enter a valid email address.' },
    { id: 'message', check: v => v.trim().length >= 10,                 msg: 'Your message should be at least 10 characters.' }
  ];

  form.addEventListener('submit', event => {
    let valid = true;
    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const error = document.getElementById(f.id + '-error');
      const ok = f.check(input.value);
      error.textContent = ok ? '' : f.msg;
      input.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      event.preventDefault();
      form.querySelector('.invalid').focus();
    }
  });
}
