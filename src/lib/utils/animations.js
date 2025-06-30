// src/lib/utils/animations.js
import gsap from 'gsap';

export const animations = {
  // Simple fade in animation
  fadeIn: (element, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 0.8,
      ease: 'power2.out',
      delay: 0,
      y: 30
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element, 
      { opacity: 0, y: config.y },
      { 
        opacity: 1, 
        y: 0, 
        duration: config.duration, 
        ease: config.ease,
        delay: config.delay
      }
    );
  },

  // Page transition in
  pageTransitionIn: (element, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 0.5,
      ease: 'power2.out',
      delay: 0
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: config.duration, 
        ease: config.ease,
        delay: config.delay
      }
    );
  },

  // Stagger animation
  staggerIn: (elements, options = {}) => {
    if (!elements || elements.length === 0) return;
    
    const defaults = {
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0,
      y: 30
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(elements,
      { opacity: 0, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease,
        delay: config.delay
      }
    );
  },

  // Scale in animation
  scaleIn: (element, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0,
      scale: 0.8
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element,
      { opacity: 0, scale: config.scale },
      { opacity: 1, scale: 1, duration: config.duration, ease: config.ease, delay: config.delay }
    );
  },

  // Hover scale effect
  hoverScale: (element, scale = 1.05) => {
    if (!element) return;
    
    return {
      enter: () => gsap.to(element, { scale, duration: 0.3, ease: 'power2.out' }),
      leave: () => gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' })
    };
  },

  // Counter animation
  animateCounter: (element, target, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 2,
      ease: 'power2.out',
      suffix: '',
      delay: 0
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element, 
      { textContent: 0 },
      {
        textContent: target,
        duration: config.duration,
        ease: config.ease,
        delay: config.delay,
        snap: { textContent: 1 },
        onUpdate: function() {
          element.textContent = Math.ceil(this.targets()[0].textContent) + config.suffix;
        }
      }
    );
  },

  // Cleanup function
  cleanup: () => {
    gsap.killTweensOf("*");
  },

  // Initialize function
  init: () => {
    gsap.defaults({
      duration: 0.6,
      ease: 'power2.out'
    });
  }
};

// Simple scroll observer
export const createScrollObserver = (callback, options = {}) => {
  const defaults = {
    threshold: 0.1,
    rootMargin: '50px 0px',
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target, entry);
      }
    });
  }, defaults);
};

export const animationPresets = {
  hero: {
    title: { duration: 1, delay: 0.2, y: 50 },
    subtitle: { duration: 0.8, delay: 0.4, y: 30 },
    cta: { duration: 0.6, delay: 0.6, y: 20, stagger: 0.1 }
  },
  card: {
    fadeIn: { duration: 0.6, y: 30 },
    stagger: { duration: 0.5, stagger: 0.1, y: 30 },
    hover: { scale: 1.05, duration: 0.3 }
  },
  section: {
    title: { duration: 0.8, y: 30 },
    content: { duration: 0.6, delay: 0.2, y: 20 }
  }
};