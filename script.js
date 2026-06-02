/* ── NAVBAR SCROLL ────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER MENU ───────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── SMOOTH SCROLL FOR NAV LINKS ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ANIMATIONS ─────────────────────── */
const fadeEls = document.querySelectorAll(
  '.service-card, .why-card, .tech-item, .about-card, .client-logo-box, .pillar, .stat'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach(el => observer.observe(el));

/* ── ANIMATED COUNTER ─────────────────────────────── */
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const heroStats = document.querySelectorAll('.stat-num');
let statsAnimated = false;
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    const data = [
      { el: heroStats[0], val: 40, suffix: '%' },
      { el: heroStats[1], val: 3,  suffix: 'x' },
      { el: heroStats[2], val: 99, suffix: '%' },
    ];
    data.forEach(({ el, val, suffix }) => {
      if (el) animateCounter(el, val, suffix);
    });
  }
}, { threshold: 0.5 });
if (heroStats.length) statsObserver.observe(heroStats[0].closest('.hero-stats') || heroStats[0]);

/* ── BAR FILL ANIMATION ───────────────────────────── */
const bars = document.querySelectorAll('.bar-fill');
const barsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.style.width;
      el.style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { el.style.width = target; }, 100);
      });
      barsObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barsObserver.observe(b));

/* ── CONTACT FORM SUBMIT ──────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.style.color = active ? 'var(--teal)' : '';
        link.style.background = active ? 'var(--gray-100)' : '';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));
