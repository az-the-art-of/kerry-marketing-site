const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const form = document.querySelector('#contact-form');
if (form) {
  const params = new URLSearchParams(window.location.search);
  const requestedSubject = params.get('subject');
  if (requestedSubject) {
    const select = form.querySelector('#subject');
    if (select) {
      const option = [...select.options].find(o => o.text.toLowerCase().includes(requestedSubject.toLowerCase()));
      if (option) select.value = option.value;
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = 'The form is a front-end preview and is not connected to an inbox yet. Connect a form provider to enable delivery.';
  });
}

// Gentle on-scroll reveal effects (respects the user's reduced-motion preference).
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll('.section-pad, .manifesto, .service-card, .team-photo-frame, .split-visual, .split-copy, .page-hero, .service-detail-row, .contact-form, .contact-info, .values-grid article');
  revealTargets.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.parentElement && el.parentElement.classList.contains('service-cards')) {
      el.style.setProperty('--reveal-delay', `${index * 90}ms`);
      el.classList.add('reveal-stagger');
    }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }
}
