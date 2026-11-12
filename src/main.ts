import './style.css';

// The proposal is rendered at build time. Only navigation needs JavaScript.
const contents = document.querySelector<HTMLDetailsElement>('#contents');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.reading-nav nav a');

function updateCurrentSection(id: string) {
  for (const link of navLinks) {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

document.addEventListener('click', event => {
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  if (contents?.contains(link)) contents.open = false;
  const heading = (target.matches('section') ? target.querySelector<HTMLElement>('h2') : target) ?? target;
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  requestAnimationFrame(() => heading.focus({ preventScroll: true }));
});

contents?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && contents.open) {
    contents.open = false;
    contents.querySelector('summary')?.focus();
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) updateCurrentSection(entry.target.id);
  }, { rootMargin: '-8% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}

window.addEventListener('hashchange', () => updateCurrentSection(location.hash.slice(1)));
if (location.hash) updateCurrentSection(location.hash.slice(1));
