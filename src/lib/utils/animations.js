import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation utilities
export const animations = {
  // Fade in animation
  fadeIn: (element, options = {}) => {
    const defaults = {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power2.out',
      ...options
    };
    
    gsap.fromTo(element, 
      { opacity: defaults.opacity, y: defaults.y },
      { 
        opacity: 1, 
        y: 0, 
        duration: defaults.duration, 
        ease: defaults.ease,
        ...options 
      }
    );
  },
  
  // Stagger animation for multiple elements
  staggerIn: (elements, options = {}) => {
    const defaults = {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    };
    
    gsap.fromTo(elements,
      { opacity: defaults.opacity, y: defaults.y },
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
  
  // Parallax effect
  parallax: (element, speed = 0.5) => {
    gsap.to(element, {
      y: () => window.scrollY * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  },
  
  // Mouse follow animation
  mouseFollow: (element, container, speed = 0.1) => {
    let xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3' });
    let yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3' });
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      xTo(x * speed);
      yTo(y * speed);
    });
    
    container.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  },
  
  // Text reveal animation
  textReveal: (element, options = {}) => {
    const defaults = {
      duration: 1,
      delay: 0,
      ease: 'power2.out',
      ...options
    };
    
    gsap.fromTo(element,
      {
        clipPath: 'inset(0 100% 0 0)'
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: defaults.duration,
        delay: defaults.delay,
        ease: defaults.ease,
        ...options
      }
    );
  },
  
  // Scale animation on scroll
  scaleOnScroll: (element, options = {}) => {
    const defaults = {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ...options
    };
    
    gsap.fromTo(element,
      { scale: defaults.scale, opacity: defaults.opacity },
      {
        scale: 1,
        opacity: 1,
        duration: defaults.duration,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true
        }
      }
    );
  },
  
  // Counter animation
  counter: (element, target, duration = 2) => {
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value);
      }
    });
  },
  
  // Initialize animations on page load
  init: () => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
    
    // Set up default animations for elements with data attributes
    document.querySelectorAll('[data-animate="fade-in"]').forEach(el => {
      animations.fadeIn(el);
    });
    
    document.querySelectorAll('[data-animate="scale"]').forEach(el => {
      animations.scaleOnScroll(el);
    });
    
    // Parallax elements
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      animations.parallax(el, speed);
    });
  },
  
  // Clean up animations
  destroy: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};

// Create intersection observer for lazy animations
export const createAnimationObserver = (options = {}) => {
  const defaults = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Custom animation based on data attribute
        const animationType = entry.target.dataset.animate;
        if (animationType && animations[animationType]) {
          animations[animationType](entry.target);
        }
      }
    });
  }, defaults);
};