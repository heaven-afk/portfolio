/**
 * Portfolio Main JavaScript
 * Author: Zion Ogadi (2026 Modernized)
 * 
 * Features:
 * - Mobile Navigation Toggle
 * - Enhanced Scroll Reveal with Stagger
 * - Data Visualization Animations
 * - Smooth Scrolling & Nav State
 */

(function () {
  'use strict';

  // ==========================================
  // Dark Mode System (Injected)
  // ==========================================
  const initTheme = () => {
    const htmlEl = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved or system preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      htmlEl.setAttribute('data-theme', 'dark');
    }

    // Create and Inject Toggle Button
    const injectToggle = () => {
      // Find the main container (nav-inner)
      const navInner = document.querySelector('.nav-inner');
      if (!navInner) return;

      // Prevent duplicate injection
      if (document.querySelector('.theme-toggle')) return;

      const btn = document.createElement('button');
      btn.className = 'theme-toggle';
      btn.setAttribute('aria-label', 'Toggle Dark Mode');
      btn.innerHTML = `
        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      `;

      btn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          htmlEl.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
        } else {
          htmlEl.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      });

      // Insert logic:
      // Mobile: Insert before the hamburger menu (.nav-toggle) so it's [Brand] [Theme] [Hamburger]
      // Desktop: It will just be in the flex container
      const navToggle = navInner.querySelector('.nav-toggle');
      if (navToggle && getComputedStyle(navToggle).display !== 'none') {
        // If nav toggle exists (mobile view potentially), insert before it
        navInner.insertBefore(btn, navToggle);
      } else {
        // Otherwise append to end (Desktop standard)
        navInner.appendChild(btn);
      }
    };

    // Run injection
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectToggle);
    } else {
      injectToggle();
    }
  };

  initTheme();

  // Check Reduced Motion Preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // Mobile Navigation
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-links--open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('nav-links--open')) {
        navLinks.classList.remove('nav-links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // Scroll Reveal System (Refined)
  // ==========================================

  // Helper: Apply stagger delays to grid children automatically
  const applyStaggerToGrids = () => {
    if (prefersReducedMotion) return;

    const grids = document.querySelectorAll('.grid, .skills-grid');
    grids.forEach(grid => {
      // Find direct reveal children or reveal cards within grid
      const items = grid.querySelectorAll('.reveal, .card.reveal, .skill-group.reveal');
      items.forEach((item, index) => {
        // Stagger logic: 0ms, 100ms, 200ms... reset every row (approx 3)
        // Or simple sequential flow for smoother cascading
        const delay = (index % 4) * 100; // Loops 0, 100, 200, 300
        item.style.transitionDelay = `${delay}ms`;
        // Also add data attribute for reference
        item.setAttribute('data-delay', delay);
      });
    });
  };

  applyStaggerToGrids();

  // Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: Stop observing once revealed for better performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Slightly higher threshold to ensure elements are truly entering
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: Show all if no observer support or reduced motion
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ==========================================
  // Navigation Scroll State
  // ==========================================
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // ==========================================
  // Data Visualization Animations
  // ==========================================
  const animateVisuals = () => {
    if (prefersReducedMotion) return;

    const vizObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Handle widths (progress bars)
          if (target.dataset.width) {
            target.style.width = target.dataset.width;
          }

          // Handle specific animations
          target.classList.add('animate');
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.progress-fill, .bar-fill, .stat-number').forEach(el => {
      vizObserver.observe(el);
    });
  };

  // ==========================================
  // Back To Top
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    animateVisuals();

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });

})();
