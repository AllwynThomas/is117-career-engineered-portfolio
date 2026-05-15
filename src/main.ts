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
