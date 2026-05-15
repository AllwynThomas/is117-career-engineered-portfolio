'use strict';

// ---------- Mobile Navigation Toggle ----------
const navToggle = document.getElementById('nav-toggle') as HTMLButtonElement;
const navMenu = document.getElementById('nav-menu') as HTMLUListElement;
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__link');

navToggle.addEventListener('click', (): void => {
  const isOpen: boolean = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  const icon = navToggle.querySelector('i');
  if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

navLinks.forEach((link: HTMLAnchorElement): void => {
  link.addEventListener('click', (): void => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  });
});

// ---------- Header Background on Scroll ----------
const header = document.getElementById('header') as HTMLElement;

window.addEventListener('scroll', (): void => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---------- Scroll Animations / Intersection Observer ----------
const revealElements = document.querySelectorAll<HTMLElement>('.reveal');

const revealObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
  entries.forEach((entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
});

revealElements.forEach((el: HTMLElement): void => revealObserver.observe(el));

// ---------- Active Nav Link Highlight on Scroll ----------
const sections = document.querySelectorAll<HTMLElement>('section[id]');

const activateNavLink = (): void => {
  const scrollY: number = window.scrollY + 100;

  sections.forEach((section: HTMLElement): void => {
    const top: number = section.offsetTop - 100;
    const height: number = section.offsetHeight;
    const id: string | null = section.getAttribute('id');
    const link: HTMLAnchorElement | null = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
};

window.addEventListener('scroll', activateNavLink, { passive: true });

// ---------- Dark / Light Mode Toggle ----------
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const themeIcon   = document.getElementById('theme-icon')   as HTMLElement;

const applyTheme = (theme: 'dark' | 'light'): void => {
  document.body.classList.toggle('light-mode', theme === 'light');
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
};

const raw = localStorage.getItem('theme');
const savedTheme: 'dark' | 'light' = raw === 'light' ? 'light' : 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', (): void => {
  const next: 'dark' | 'light' = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});
