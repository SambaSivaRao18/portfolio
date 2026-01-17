// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navContainer = document.querySelector('.nav-container');
const body = document.body;

mobileToggle.addEventListener('click', () => {
  const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', !isExpanded);
  mobileToggle.classList.toggle('active');
  navContainer.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('active');
    navContainer.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// Close mobile menu on Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navContainer.classList.contains('active')) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('active');
    navContainer.classList.remove('active');
    body.classList.remove('menu-open');
  }
});

// Hero Animations
const heroTl = gsap.timeline();
heroTl.from(".name", { y: 50, opacity: 0, duration: 1, ease: "power4.out" })
  .from(".role", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
  .from(".home-text", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".home-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".social-icons a", { y: 10, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
  .from(".home-image", { scale: 0.8, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "-=1");

// Section Reveal Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  gsap.from(section.querySelectorAll('.badge, h1, h2, .about-text, .project-card, .exp-card, .cert-card, .contact-info, .contact-form'), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
  });
});

// Skill Bars Animation
gsap.utils.toArray('.skill-bar span').forEach(bar => {
  const parent = bar.closest('.skill-box');
  const targetWidth = parent.querySelector('.skill-percent').textContent;

  gsap.to(bar, {
    scrollTrigger: {
      trigger: parent,
      start: "top 90%",
    },
    width: targetWidth,
    duration: 1.5,
    ease: "power4.out"
  });
});

// Smooth Scroll (Native is already set in CSS, but GSAP can enhance it)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Refresh ScrollTrigger on load
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// Floating Icons System
class FloatingIcons {
  constructor(options = {}) {
    this.container = document.getElementById('floating-icons');
    this.icons = options.icons || ['shield', 'lock', 'code', 'bug', 'terminal', 'user-secret'];
    this.density = options.density || 15;
    this.minSpeed = options.minSpeed || 20;
    this.maxSpeed = options.maxSpeed || 40;
    this.minSize = options.minSize || 15;
    this.maxSize = options.maxSize || 40;

    if (this.container) this.init();
  }

  init() {
    for (let i = 0; i < this.density; i++) {
      this.createIcon();
    }
  }

  createIcon() {
    const iconEl = document.createElement('div');
    const iconName = this.icons[Math.floor(Math.random() * this.icons.length)];
    iconEl.className = 'floating-icon';
    iconEl.innerHTML = `<i class='fas fa-${iconName}'></i>`;

    const size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
    const delay = Math.random() * -duration;
    const opacity = Math.random() * (0.15 - 0.05) + 0.05;

    Object.assign(iconEl.style, {
      fontSize: `${size}px`,
      left: `${posX}%`,
      top: `${posY}%`,
      opacity: opacity,
      animation: `drift ${duration}s infinite alternate ease-in-out ${delay}s`,
      filter: Math.random() > 0.5 ? 'blur(1px)' : 'none'
    });

    this.container.appendChild(iconEl);
  }
}

// Initialize Floating Icons System
document.addEventListener('DOMContentLoaded', () => {
  new FloatingIcons({
    density: 20,
    minSpeed: 30,
    maxSpeed: 60,
    icons: ['shield-halved', 'lock', 'ghost', 'code', 'terminal', 'user-shield', 'microchip', 'database']
  });

  // Personal Info Obfuscation (Bot Protection)
  const user = "sambayadav121";
  const domain = "gmail.com";
  const emailAddr = user + "@" + domain;
  const phoneNum = "+91 6302463508";

  // Populate Email
  document.querySelectorAll('.dynamic-email-text').forEach(el => el.innerText = emailAddr);
  document.querySelectorAll('.dynamic-email-link').forEach(el => el.href = "mailto:" + emailAddr);

  // Populate Phone
  document.querySelectorAll('.dynamic-phone-text').forEach(el => el.innerText = phoneNum);
  document.querySelectorAll('.dynamic-phone-link').forEach(el => el.href = "tel:" + phoneNum.replace(/\s/g, ''));
});

// Disable right click
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
