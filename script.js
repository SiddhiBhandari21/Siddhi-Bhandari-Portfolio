/* ===== Mobile menu ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));
document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

/* ===== Qualification tabs ===== */
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('.qualification__content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach(c => c.classList.remove('qualification__content-active'));
    tabs.forEach(t => t.classList.remove('qualification__active'));
    target.classList.add('qualification__content-active');
    tab.classList.add('qualification__active');
  });
});

/* ===== Project filters ===== */
const filterItems = document.querySelectorAll('.projects__item');
const projectCards = document.querySelectorAll('.projects__card');
filterItems.forEach(item => {
  item.addEventListener('click', () => {
    filterItems.forEach(i => i.classList.remove('active-project'));
    item.classList.add('active-project');
    const filter = item.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      const show = filter === 'all' ? !cats.includes('security') : cats.includes(filter);
      card.classList.toggle('hide', !show);
    });
  });
});

/* ===== Active link on scroll + header shadow + scroll-up ===== */
const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');

function onScroll() {
  const y = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const link = document.querySelector(`.nav__list a[href*="${section.id}"]`);
    if (!link) return;
    link.classList.toggle('active-link', y > top && y <= top + height);
  });
  header.classList.toggle('scroll-header', y >= 80);
  scrollUp.classList.toggle('show-scroll', y >= 560);
}
window.addEventListener('scroll', onScroll);
onScroll();

/* ===== Dark / light theme (remembered per browser) ===== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

function getSaved(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function setSaved(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

const savedTheme = getSaved('selected-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
  themeButton.classList.remove('ri-moon-line');
}
themeButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme, isDark);
  themeButton.classList.toggle('ri-moon-line', !isDark);
  setSaved('selected-theme', isDark ? 'dark' : 'light');
});

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll(
  '.about__container, .skills__content, .projects__card, .qualification__container, .cert__card, .award__card, .contact__card'
);
revealEls.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();
