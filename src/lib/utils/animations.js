import gsap from 'gsap';

// Simplified animation utilities
export const animations = {
  // Simple fade in animation
  fadeIn: (element, options = {}) => {
    const defaults = {
      duration: 0.6,
      ease: 'power2.out',
      ...options
    };
    
    gsap.fromTo(element, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: defaults.duration, 
        ease: defaults.ease,
        ...options 
      }
    );
  },
  
  // Simple stagger animation for multiple elements
  staggerIn: (elements, options = {}) => {
    const defaults = {
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    };
    
    gsap.fromTo(elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: defaults.duration,
        stagger: defaults.stagger,
        ease: defaults.ease,
        ...options
      }
    );
  },
  
  // Simple slide animation
  slideIn: (element, direction = 'up', options = {}) => {
    const directions = {
      up: { y: 30 },
      down: { y: -30 },
      left: { x: 30 },
      right: { x: -30 }
    };
    
    const from = { opacity: 0, ...directions[direction] };
    const to = { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out', ...options };
    
    gsap.fromTo(element, from, to);
  },
  
  // Simple scale animation
  scaleIn: (element, options = {}) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', ...options }
    );
  },
  
  // Simple hover scale
  hoverScale: (element, scale = 1.05) => {
    return {
      enter: () => gsap.to(element, { scale, duration: 0.2, ease: 'power2.out' }),
      leave: () => gsap.to(element, { scale: 1, duration: 0.2, ease: 'power2.out' })
    };
  },
  
  // Clean up function
  cleanup: () => {
    gsap.killTweensOf("*");
  }
};

// Simple intersection observer for scroll animations
export const createScrollObserver = (callback, options = {}) => {
  const defaults = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, defaults);
};