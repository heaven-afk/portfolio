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
  // Initialize All Animations
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
    animateBarCharts();
    animateLineCharts();
    animateStatNumbers();
  });

})();
