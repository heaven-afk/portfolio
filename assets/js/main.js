/**
 * Portfolio Main JavaScript
 * Author: Zion Ogadi
 * 
 * Features:
 * - Mobile Navigation Toggle
 * - Scroll Reveal Animations
 * - Data Visualization Animations
 * - Smooth Scrolling
 */

(function () {
  'use strict';

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

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('nav-links--open')) {
        navLinks.classList.remove('nav-links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.add('active'); // For new animations
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      root: null,
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '0px 0px -50px 0px' // Offset slightly
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers: show all immediately
    revealElements.forEach(el => {
      el.classList.add('is-visible');
      el.classList.add('active');
    });
  }

  // ==========================================
  // Data Visualization Animations
  // ==========================================

  // Animate progress bars
  const animateProgressBars = () => {
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressFill = entry.target;
          const targetWidth = progressFill.getAttribute('data-width');
          if (targetWidth) {
            setTimeout(() => {
              progressFill.style.width = targetWidth;
              progressFill.classList.add('animate');
            }, 200);
          }
          observer.unobserve(progressFill);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-fill').forEach(fill => {
      progressObserver.observe(fill);
    });
  };

  // Animate bar charts
  const animateBarCharts = () => {
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const barFill = entry.target;
          const targetWidth = barFill.getAttribute('data-width');
          if (targetWidth) {
            setTimeout(() => {
              barFill.style.width = targetWidth;
              barFill.classList.add('animate');
            }, 200);
          }
          observer.unobserve(barFill);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bar-fill').forEach(bar => {
      barObserver.observe(bar);
    });
  };

  // Animate line chart points
  const animateLineCharts = () => {
    const lineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const linePoint = entry.target;
          const targetHeight = linePoint.getAttribute('data-height');
          if (targetHeight) {
            setTimeout(() => {
              linePoint.style.height = targetHeight;
              linePoint.classList.add('animate');
            }, 200);
          }
          observer.unobserve(linePoint);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.line-point').forEach(point => {
      lineObserver.observe(point);
    });
  };

  // Animate stat numbers
  const animateStatNumbers = () => {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
      statObserver.observe(stat);
    });
  };

  // ==========================================
  // Smooth Scroll (Enhancement)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        targetElement.focus({ preventScroll: true }); // A11y
      }
    });
  });

  // ==========================================
  // Prefers Reduced Motion Check
  // ==========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // Navigation Scroll State
  // ==========================================
  const nav = document.querySelector('.nav');
  if (nav && !prefersReducedMotion) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ==========================================
  // Hero Entrance Animation
  // ==========================================
  if (!prefersReducedMotion) {
    window.addEventListener('load', () => {
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroActions = document.querySelector('.hero-actions');

      // Only animate if these elements exist (homepage)
      if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('enter'), 50);
      }
      if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('enter'), 50);
      }
      if (heroActions) {
        setTimeout(() => heroActions.classList.add('enter'), 50);
      }
    });
  }

  // ==========================================
  // Back to Top Button
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > 35) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // Enhanced Scroll Reveal with Stagger
  // ==========================================
  const applyStaggerToGrids = () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
      const revealChildren = grid.querySelectorAll('.reveal');
      revealChildren.forEach((child, index) => {
        // Apply stagger delays: 60ms, 120ms, 180ms, 240ms, etc.
        const delay = (index * 60) + 100;
        child.setAttribute('data-delay', delay.toString());
      });
    });
  };

  // Apply stagger before reveal observer runs
  if (!prefersReducedMotion) {
    applyStaggerToGrids();
  }

  // ==========================================
  // Initialize All Animations
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
    animateBarCharts();
    animateLineCharts();
    animateStatNumbers();
  });

})();
