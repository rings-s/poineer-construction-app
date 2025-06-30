<!-- src/lib/components/Hero.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { t } from '$lib/stores/locale.js';
  import { animations } from '$lib/utils/animations.js';
  
  let heroRef;
  let titleRef;
  let subtitleRef;
  let ctaRef;
  let scrollIndicatorRef;
  let particlesContainer;
  
  onMount(() => {
    // Dynamic imports for better performance
    import('gsap/ScrollTrigger').then((module) => {
      const ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      
      // Parallax effect for floating elements
      gsap.to('.geometric-shape', {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * (target.dataset.speed || 0.5),
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 0,
          end: 'max',
          scrub: true
        }
      });
    });
    
    // Enhanced entrance animations
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Title animation with character reveal
    if (titleRef) {
      const titleText = titleRef.querySelectorAll('.title-line');
      tl.fromTo(titleText, 
        { opacity: 0, y: 100, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1.2, 
          ease: 'back.out(1.7)',
          stagger: 0.2
        }
      );
    }
    
    // Subtitle with typewriter effect
    if (subtitleRef) {
      tl.fromTo(subtitleRef,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out' 
        }, '-=0.5'
      );
    }
    
    // CTA buttons with magnetic effect
    if (ctaRef) {
      tl.fromTo(ctaRef.children,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)'
        }, '-=0.3'
      );
    }
    
    // Scroll indicator pulse animation
    if (scrollIndicatorRef) {
      gsap.to(scrollIndicatorRef, {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
    
    // Floating geometric shapes with advanced animations
    const shapes = heroRef.querySelectorAll('.geometric-shape');
    
    shapes.forEach((shape, index) => {
      // Initial entrance
      gsap.fromTo(shape, 
        { 
          scale: 0, 
          rotation: -180, 
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 0.2 + (index * 0.05),
          filter: 'blur(0px)',
          duration: 1.5,
          delay: 1.5 + index * 0.3,
          ease: 'back.out(1.7)'
        }
      );
      
      // Continuous floating animation
      gsap.to(shape, {
        y: `random(-40, 40)`,
        x: `random(-40, 40)`,
        rotation: `random(-360, 360)`,
        duration: `random(8, 15)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5
      });
      
      // Pulsing opacity
      gsap.to(shape, {
        opacity: `random(0.1, 0.3)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.8
      });
    });
    
    // Interactive mouse parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        gsap.to(shape, {
          x: `+=${xPos * 15 * speed}`,
          y: `+=${yPos * 15 * speed}`,
          rotationY: xPos * 10,
          rotationX: -yPos * 10,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      
      // Parallax for main content
      gsap.to(titleRef, {
        x: xPos * 10,
        y: yPos * 10,
        duration: 1,
        ease: 'power2.out'
      });
    };
    
    // Enhanced CTA button interactions
    const ctaButtons = ctaRef?.querySelectorAll('a');
    ctaButtons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
      gsap.killTweensOf('.geometric-shape');
    };
  });
</script>

<section bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
  <!-- Dark animated gradient background -->
  <div class="absolute inset-0 gradient-bg"></div>
  
  <!-- Dark overlay for better text contrast -->
  <div class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
  
  <!-- Animated grid pattern overlay -->
  <div class="absolute inset-0 opacity-10 grid-pattern"></div>
  
  <!-- Enhanced Geometric Shapes -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <!-- Primary shapes with better visibility on dark background -->
    <div class="geometric-shape absolute top-20 left-10 w-24 h-24 
                border-4 border-primary-400 rounded-2xl rotate-45
                shadow-lg shadow-primary-500/50 bg-primary-500/20" 
         data-speed="0.6"></div>
    
    <div class="geometric-shape absolute top-40 right-20 w-20 h-20 
                bg-accent-400/30 border-2 border-accent-400 rounded-full
                shadow-lg shadow-accent-500/50" 
         data-speed="0.4"></div>
    
    <div class="geometric-shape absolute bottom-32 left-1/4 w-32 h-32 
                border-4 border-primary-300 rounded-3xl
                shadow-lg shadow-primary-500/40 bg-primary-600/10" 
         data-speed="0.8"></div>
    
    <div class="geometric-shape absolute bottom-40 right-1/3 w-28 h-28 
                bg-primary-300/20 border-3 border-primary-300
                clip-triangle shadow-lg shadow-primary-500/50" 
         data-speed="0.5"></div>
    
    <div class="geometric-shape absolute top-1/2 right-10 w-16 h-16 
                bg-accent-500/30 border-2 border-accent-500 rounded-full
                shadow-lg shadow-accent-500/60" 
         data-speed="0.7"></div>
    
    <!-- Additional decorative elements -->
    <div class="geometric-shape absolute top-1/3 left-1/2 w-6 h-6 
                bg-primary-600 rounded-full
                shadow-md shadow-primary-500/70" 
         data-speed="0.3"></div>
    
    <div class="geometric-shape absolute bottom-1/4 left-16 w-12 h-12 
                border-2 border-accent-400 rounded-lg rotate-45
                shadow-md shadow-accent-500/60 bg-accent-500/20" 
         data-speed="0.9"></div>
  </div>
  
  <!-- Main Content -->
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-5xl mx-auto text-center">
      <!-- Enhanced title with gradient and animations -->
      <div bind:this={titleRef} class="mb-8 perspective-1000">
        <div class="title-line block mb-2">
          <span class="hero-title-gradient text-5xl md:text-7xl lg:text-8xl font-black 
                       bg-gradient-to-r from-white via-primary-200 to-accent-200 
                       bg-clip-text text-transparent leading-tight tracking-tight">
            {$t('hero.title1')}
          </span>
        </div>
        <div class="title-line block">
          <span class="hero-title-secondary text-4xl md:text-6xl lg:text-7xl font-black 
                       text-white leading-tight tracking-tight">
            {$t('hero.title2')}
          </span>
        </div>
      </div>
      
      <!-- Enhanced subtitle -->
      <p bind:this={subtitleRef} 
         class="text-xl md:text-2xl lg:text-3xl text-neutral-200 
                mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
        {$t('hero.subtitle')}
      </p>
      
      <!-- Enhanced CTA buttons -->
      <div bind:this={ctaRef} class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a href="/services" 
           class="cta-primary group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 
                  text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl 
                  transition-all duration-300 transform-gpu overflow-hidden
                  hover:from-primary-500 hover:to-accent-500">
          <span class="relative z-10 group-hover:scale-105 transition-transform duration-300">
            {$t('hero.cta1')}
          </span>
          <!-- Button shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <!-- Button glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 
                      opacity-0 group-hover:opacity-75 blur-xl transition-all duration-300 -z-10"></div>
        </a>
        
        <a href="/contact" 
           class="cta-secondary group relative px-8 py-4 bg-white/10 backdrop-blur-sm
                  border-2 border-white/30 text-white 
                  font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform-gpu overflow-hidden
                  hover:bg-white/20 hover:border-white/50">
          <span class="relative z-10 transition-colors duration-300">
            {$t('hero.cta2')}
          </span>
          <!-- Hover fill effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 
                      origin-left -z-10"></div>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Enhanced scroll indicator -->
  <div bind:this={scrollIndicatorRef} 
       class="absolute bottom-8 left-1/2 transform -translate-x-1/2 
              flex flex-col items-center space-y-2 text-white/80">
    <span class="text-sm font-medium tracking-wide">{$t('hero.scrollDown')}</span>
    <div class="w-6 h-10 border-2 border-current rounded-full p-1">
      <div class="w-1 h-3 bg-current rounded-full mx-auto animate-bounce"></div>
    </div>
  </div>
  
  <!-- Floating particles effect -->
  <div bind:this={particlesContainer} class="absolute inset-0 pointer-events-none">
    {#each Array(20) as _, i}
      <div class="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 
                  rounded-full opacity-40 animate-float"
           style="left: {Math.random() * 100}%; 
                  top: {Math.random() * 100}%; 
                  animation-delay: {i * 0.5}s; 
                  animation-duration: {3 + Math.random() * 4}s;"></div>
    {/each}
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    perspective: 1000px;
  }
  
  /* Dark animated gradient background */
  .gradient-bg {
    background: linear-gradient(-45deg, 
      var(--color-primary-600), 
      var(--color-primary-500), 
      var(--color-primary-400), 
      var(--color-accent-500),
      var(--color-primary-700),
      var(--color-accent-600));
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .clip-triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .geometric-shape {
    transform-style: preserve-3d;
    will-change: transform;
    filter: blur(0px);
  }
  
  .hero-title-gradient {
    background: linear-gradient(135deg, 
      #ffffff 0%, 
      var(--color-primary-200) 25%,
      var(--color-accent-200) 50%,
      var(--color-primary-100) 75%,
      #ffffff 100%);
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .grid-pattern {
    background-image: 
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  .cta-primary:hover {
    transform: translateY(-2px) scale(1.02);
  }
  
  .cta-secondary:hover {
    transform: translateY(-2px) scale(1.02);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(120deg); }
    66% { transform: translateY(-5px) rotate(240deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  /* Enhanced mobile responsiveness */
  @media (max-width: 640px) {
    .hero-title-gradient {
      font-size: 2.5rem;
    }
    
    .hero-title-secondary {
      font-size: 2rem;
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .geometric-shape,
    .animate-float,
    .grid-pattern,
    .gradient-bg {
      animation: none;
    }
    
    .gradient-bg {
      background: var(--color-primary-600);
    }
    
    .hero-title-gradient {
      background: #ffffff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>