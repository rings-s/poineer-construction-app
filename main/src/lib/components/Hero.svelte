<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { t } from '$lib/stores/locale.js';
  
  gsap.registerPlugin(ScrollTrigger);
  
  let heroRef;
  let titleRef1;
  let titleRef2;
  let subtitleRef;
  let ctaRef;
  
  onMount(() => {
    // Split text animation
    const splitText = (element) => {
      const text = element.textContent;
      element.innerHTML = text
        .split('')
        .map(char => `<span class="char-animate">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
      return element.querySelectorAll('.char-animate');
    };
    
    // Animate title characters
    const chars1 = splitText(titleRef1);
    const chars2 = splitText(titleRef2);
    
    // Main timeline
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate first title line
    tl.to(chars1, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        each: 0.03,
        from: 'random'
      },
      ease: 'power3.out'
    });
    
    // Animate second title line
    tl.to(chars2, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        each: 0.03,
        from: 'random'
      },
      ease: 'power3.out'
    }, '-=0.4');
    
    // Animate subtitle
    tl.from(subtitleRef, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.4');
    
    // Animate CTA buttons
    tl.from(ctaRef.children, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.4');
    
    // Floating geometric shapes with advanced animations
    const shapes = heroRef.querySelectorAll('.geometric-shape');
    
    shapes.forEach((shape, index) => {
      // Initial animation
      gsap.from(shape, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        delay: 1 + index * 0.2,
        ease: 'back.out(1.7)'
      });
      
      // Continuous floating animation
      gsap.to(shape, {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        rotation: 'random(-360, 360)',
        duration: 'random(6, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5
      });
    });
    
    // Mouse parallax effect with perspective
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      
      // Move shapes based on mouse position
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        gsap.to(shape, {
          x: xPos * 40 * speed,
          y: yPos * 40 * speed,
          rotationY: xPos * 10,
          rotationX: -yPos * 10,
          duration: 1,
          overwrite: 'auto'
        });
      });
      
      // Subtle text movement
      gsap.to([titleRef1, titleRef2], {
        x: xPos * 10,
        y: yPos * 10,
        duration: 1,
        overwrite: 'auto'
      });
    };
    
    // Scroll-triggered animations
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // Add scroll parallax
    gsap.to('.geometric-shape', {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: true
      }
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
</script>

<section bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Animated gradient background -->
  <div class="absolute inset-0 gradient-bg opacity-5"></div>
  
  <!-- Grid pattern overlay -->
  <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E');"></div>
  
  <!-- Geometric Shapes with data-speed for parallax -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="geometric-shape absolute top-20 left-10 w-20 h-20 border-4 border-primary-400" 
         data-speed="0.5" style="transform-style: preserve-3d;"></div>
    <div class="geometric-shape absolute top-40 right-20 w-16 h-16 bg-accent-400 rounded-full opacity-20" 
         data-speed="0.3"></div>
    <div class="geometric-shape absolute bottom-20 left-1/4 w-24 h-24 border-4 border-accent-300 rounded-lg" 
         data-speed="0.7"></div>
    <div class="geometric-shape absolute bottom-40 right-1/3 w-32 h-32 bg-primary-300 opacity-10 clip-triangle" 
         data-speed="0.4"></div>
    <div class="geometric-shape absolute top-1/2 right-10 w-12 h-12 bg-primary-500 opacity-15 rounded-full" 
         data-speed="0.6"></div>
  </div>
  
  <!-- Content -->
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="mb-6" style="perspective: 1000px;">
        <span bind:this={titleRef1} class="block text-gradient mb-2">{$t('hero.title1')}</span>
        <span bind:this={titleRef2} class="block text-neutral-900 dark:text-white">{$t('hero.title2')}</span>
      </h1>
      
      <p bind:this={subtitleRef} class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
        {$t('hero.subtitle')}
      </p>
      
      <div bind:this={ctaRef} class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/services" class="btn-primary inline-block transform hover:rotate-1 transition-all duration-300">
          {$t('hero.cta1')}
        </a>
        <a href="/contact" class="px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400
                                 rounded-lg font-semibold transition-all duration-300 
                                 hover:bg-primary-600 hover:text-white dark:hover:text-white 
                                 inline-block transform hover:-rotate-1">
          {$t('hero.cta2')}
        </a>
      </div>
    </div>
  </div>
  
  <!-- Animated scroll indicator -->
  <div class="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>

<style>
  .clip-triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  .geometric-shape {
    transform-style: preserve-3d;
    will-change: transform;
  }
  
  /* Add glow effect on hover */
  .btn-primary:hover {
    box-shadow: 0 10px 30px -10px var(--color-primary-600);
  }
  
  /* Character animation styles */
  :global(.char-animate) {
    display: inline-block;
    transform-style: preserve-3d;
    perspective: 1000px;
    will-change: transform, opacity;
  }
</style>