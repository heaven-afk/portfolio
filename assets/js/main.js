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
  // Dark Mode System (Refactored)
  // ==========================================
  // The system is now enforced as a dark tech theme via CSS :root variables.
  // Theme toggle has been removed to maintain the Discord-inspired branding.

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
