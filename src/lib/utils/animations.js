// src/lib/utils/animations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animations = {
  // Enhanced fade in animation with GSAP
  fadeIn: (element, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 0.8,
      ease: 'power2.out',
      delay: 0,
      y: 30,
      stagger: 0.1
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element, 
      { opacity: 0, y: config.y },
      { 
        opacity: 1, 
        y: 0, 
        duration: config.duration, 
        ease: config.ease,
        delay: config.delay,
        stagger: config.stagger
      }
    );
  },

  // Scroll-triggered animations
  scrollReveal: (element, options = {}) => {
    if (!element || typeof window === 'undefined') return;
    
    const defaults = {
      duration: 0.8,
      ease: 'power2.out',
      y: 50,
      opacity: 0,
      trigger: element,
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element, 
      { opacity: config.opacity, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          end: config.end,
          toggleActions: config.toggleActions
        }
      }
    );
  },

  // Stagger animations for lists/grids
  staggerReveal: (elements, options = {}) => {
    if (!elements || elements.length === 0) return;
    
    const defaults = {
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      y: 30,
      opacity: 0
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(elements,
      { opacity: config.opacity, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease
      }
    );
  },

  // Hero text animation
  heroTextReveal: (element, options = {}) => {
    if (!element) return;
    
    const defaults = {
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: config.duration, 
        ease: config.ease,
        delay: config.delay
      }
    );
  },

  // Card hover animations
  cardHover: (element) => {
    if (!element) return;
    
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    return {
      play: () => tl.play(),
      reverse: () => tl.reverse()
    };
  },

  // Cleanup function
  cleanup: () => {
    if (typeof window !== 'undefined') {
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  },

  // Initialize scroll animations
  initScrollAnimations: () => {
    if (typeof window === 'undefined') return;
    
    // Refresh ScrollTrigger on page load
    ScrollTrigger.refresh();
    
    // Add global scroll animations
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
      animations.scrollReveal(element);
    });
    
    gsap.utils.toArray('.stagger-children').forEach(container => {
      const children = container.children;
      animations.staggerReveal(children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%'
        }
      });
    });
  }
};

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    animations.initScrollAnimations();
  });
}

export default animations;