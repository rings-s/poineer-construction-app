<script>
  import { onMount, onDestroy } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let mounted = false;
  let heroRef;
  let canvasRef;
  let particleSystemRef;
  let animationFrame;
  let mouse = { x: 0, y: 0, isMoving: false };
  
  // Animation states
  let titleVisible = false;
  let subtitleVisible = false;
  let buttonsVisible = false;
  
  // Advanced animation controllers
  let mainTimeline;
  let shapeSystem = {
    cubes: [],
    spheres: [],
    pyramids: []
  };
  
  // Performance monitoring
  let fps = 60;
  let lastTime = 0;

  // Construction particle class (moved to module scope)
  class ConstructionParticle {
    constructor() {
      this.reset();
      this.type = Math.random() > 0.7 ? 'blueprint' : 'dust';
      this.shape = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
    }
    
    reset() {
      this.x = Math.random() * (this.canvas?.width || 800);
      this.y = Math.random() * (this.canvas?.height || 600);
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      
      // Mouse interaction
      const distance = Math.sqrt(
        Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2)
      );
      
      if (distance < 100 && mouse.isMoving) {
        const force = (100 - distance) / 100;
        const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
        this.vx += Math.cos(angle) * force * 0.1;
        this.vy += Math.sin(angle) * force * 0.1;
      }
      
      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;
      
      // Boundaries
      if (this.x < 0 || this.x > (this.canvas?.width || 800) || 
          this.y < 0 || this.y > (this.canvas?.height || 600)) {
        this.reset();
      }
    }
    
    draw(ctx) {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      
      if (this.type === 'blueprint') {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
      } else {
        ctx.fillStyle = '#8b5cf6';
      }
      
      switch (this.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          this.type === 'blueprint' ? ctx.stroke() : ctx.fill();
          break;
        case 'square':
          this.type === 'blueprint' 
            ? ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size)
            : ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -this.size/2);
          ctx.lineTo(-this.size/2, this.size/2);
          ctx.lineTo(this.size/2, this.size/2);
          ctx.closePath();
          this.type === 'blueprint' ? ctx.stroke() : ctx.fill();
          break;
      }
      
      ctx.restore();
    }
  }

  onMount(async () => {
    mounted = true;
    locale.init();
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all advanced features
    await initializeAdvancedAnimations();
    initializeParticleSystem();
    initialize3DShapes();
    initializeInteractiveElements();
    initializeBlueprintSystem();
    initializePerformanceMonitoring();
    
    // Start main animation sequence
    startMainAnimationSequence();
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    if (mainTimeline) {
      mainTimeline.kill();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Clean up floating cubes
    shapeSystem.cubes.forEach(cube => {
      if (cube.element && cube.element.parentNode) {
        cube.element.parentNode.removeChild(cube.element);
      }
    });
    
    // Clean up blueprint overlay
    const blueprintOverlay = document.querySelector('.blueprint-overlay');
    if (blueprintOverlay && blueprintOverlay.parentNode) {
      blueprintOverlay.parentNode.removeChild(blueprintOverlay);
    }
    
    // Safe GSAP cleanup
    if (typeof window !== 'undefined' && document.body) {
      gsap.killTweensOf("*");
    }
  });

  // Advanced animation initialization
  async function initializeAdvancedAnimations() {
    // Create main timeline for orchestrating all animations
    mainTimeline = gsap.timeline();
    
    // Advanced entrance animations with stagger
    const entranceAnimation = gsap.timeline({ paused: true });
    
    // 3D text reveal with depth
    entranceAnimation.from('.hero-title', {
      duration: 1.5,
      y: 100,
      rotateX: 90,
      transformOrigin: '50% 100%',
      ease: 'power4.out',
      stagger: 0.2
    });
    
    // Subtitle with wave effect
    entranceAnimation.from('.hero-subtitle', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      scale: 0.8,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.3
    }, '<0.5');
    
    // Buttons with magnetic effect
    entranceAnimation.from('.hero-buttons .btn', {
      duration: 0.8,
      scale: 0,
      rotation: 180,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      delay: 0.2
    }, '<0.3');
    
    setTimeout(() => {
      entranceAnimation.play();
    }, 500);
  }

  // Advanced particle system
  function initializeParticleSystem() {
    if (!canvasRef) return;
    
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    
    // Responsive canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Construction-themed particles
    const particles = [];
    const blueprintLines = [];
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
      const particle = new ConstructionParticle();
      particle.canvas = canvas;
      particles.push(particle);
    }
    
    // Animation loop
    function animate(currentTime) {
      // FPS calculation
      if (currentTime - lastTime >= 1000) {
        fps = Math.round(1000 / (currentTime - lastTime) * 60);
        lastTime = currentTime;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate(0);
  }

  // 3D shapes system
  function initialize3DShapes() {
    // Create floating 3D cubes
    for (let i = 0; i < 6; i++) {
      const cube = document.createElement('div');
      cube.className = 'floating-cube';
      cube.innerHTML = `
        <div class="cube-face front"></div>
        <div class="cube-face back"></div>
        <div class="cube-face right"></div>
        <div class="cube-face left"></div>
        <div class="cube-face top"></div>
        <div class="cube-face bottom"></div>
      `;
      
      const size = 40 + Math.random() * 60;
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
      
      cube.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform-style: preserve-3d;
        pointer-events: none;
        z-index: 1;
      `;
      
      document.body.appendChild(cube);
      shapeSystem.cubes.push({ element: cube, size, x, y });
      
      // Animate cube
      gsap.to(cube, {
        duration: 10 + Math.random() * 10,
        rotateX: 360,
        rotateY: 360,
        rotateZ: 180,
        repeat: -1,
        ease: 'none'
      });
      
      gsap.to(cube, {
        duration: 5 + Math.random() * 10,
        y: `+=${200 + Math.random() * 400}`,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }

  // Interactive elements
  function initializeInteractiveElements() {
    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      const oldX = mouse.x;
      const oldY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isMoving = Math.abs(mouse.x - oldX) > 2 || Math.abs(mouse.y - oldY) > 2;
      
      // 3D hero parallax
      if (heroRef) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const maxRotation = 10;
        
        const rotateY = ((mouse.x - centerX) / centerX) * maxRotation;
        const rotateX = -((mouse.y - centerY) / centerY) * maxRotation;
        
        gsap.to(heroRef, {
          duration: 0.8,
          rotateY: rotateY,
          rotateX: rotateX,
          transformPerspective: 1000,
          ease: 'power2.out'
        });
      }
    });
    
    // Scroll-based morphing shapes
    ScrollTrigger.create({
      trigger: heroRef,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Morph background shapes
        gsap.to('.morphing-shape', {
          duration: 0.1,
          scale: 1 + progress * 0.5,
          rotation: progress * 180,
          borderRadius: `${50 - progress * 30}%`,
        });
      }
    });
  }

  // Blueprint drawing system
  function initializeBlueprintSystem() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'blueprint-overlay');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      opacity: 0.3;
    `;
    
    // Create blueprint paths
    const paths = [
      'M100,200 L400,200 L400,500 L700,500',
      'M800,150 L1200,150 L1200,400 L1500,400',
      'M200,600 L600,600 L600,800 L900,800'
    ];
    
    paths.forEach((pathData, index) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', '#3b82f6');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-dasharray', '10,5');
      
      svg.appendChild(path);
      
      // Animate path drawing
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      
      gsap.to(path.style, {
        strokeDashoffset: 0,
        duration: 3,
        delay: index * 0.5,
        ease: 'power2.inOut'
      });
    });
    
    document.body.appendChild(svg);
  }

  // Performance monitoring
  function initializePerformanceMonitoring() {
    // Monitor and adjust animation quality based on performance
    setInterval(() => {
      if (fps < 30) {
        // Reduce particle count
        console.log('Performance optimization: Reducing effects');
        gsap.globalTimeline.timeScale(0.5);
      } else if (fps > 55) {
        gsap.globalTimeline.timeScale(1);
      }
    }, 2000);
  }

  // Main animation sequence
  function startMainAnimationSequence() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('title-trigger')) titleVisible = true;
          if (entry.target.classList.contains('subtitle-trigger')) subtitleVisible = true;
          if (entry.target.classList.contains('buttons-trigger')) buttonsVisible = true;
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.title-trigger, .subtitle-trigger, .buttons-trigger');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
</script>

<!-- Advanced Canvas for Particle System -->
<canvas 
  bind:this={canvasRef}
  class="fixed inset-0 pointer-events-none z-0"
  style="mix-blend-mode: screen;"
></canvas>

<!-- Morphing Background Shapes -->
<div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
  <div class="morphing-shape absolute top-[10%] left-[5%] w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
  <div class="morphing-shape absolute top-[60%] right-[10%] w-96 h-96 bg-gradient-to-tl from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl"></div>
  <div class="morphing-shape absolute bottom-[20%] left-[30%] w-48 h-48 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
</div>

<!-- Enhanced Hero Section -->
<section class="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500" style="perspective: 1000px;">
  
  <!-- Advanced Grid Background -->
  <div class="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]">
    <div class="grid grid-cols-24 gap-1 h-full p-4">
      {#each Array(240) as _, i}
        <div 
          class="bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 rounded-sm transform hover:scale-110 transition-transform duration-300"
          style="animation-delay: {i * 10}ms"
        ></div>
      {/each}
    </div>
  </div>

  <!-- 3D Content Container -->
  <div bind:this={heroRef} class="relative z-10 w-full transform-gpu" style="transform-style: preserve-3d;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center sm:text-left" 
           class:text-right={$locale === 'ar'} 
           class:sm:text-right={$locale === 'ar'}>
        
        <!-- Enhanced Title with 3D Effect -->
        <div class="title-trigger mb-6 sm:mb-8" style="transform-style: preserve-3d;">
          <div class="overflow-hidden">
            <h1 class="hero-title font-black text-black dark:text-white leading-[0.9] break-words" 
                style="font-size: clamp(2.5rem, 8vw, 5rem); transform-style: preserve-3d;" 
                class:font-arabic={$locale === 'ar'}>
              <div class="{titleVisible ? 'animate-slide-up-3d' : 'translate-y-full opacity-0'} transition-all duration-1000 ease-out">
                <span class="block mb-2 hyphens-auto relative" lang="{$locale}" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                  {mounted ? $t('hero.title1') : 'Bringing Vision'}
                  <!-- 3D Text Shadow -->
                  <span class="absolute inset-0 text-black/10 dark:text-white/10" style="transform: translateZ(-2px) translateX(2px) translateY(2px);">
                    {mounted ? $t('hero.title1') : 'Bringing Vision'}
                  </span>
                </span>
              </div>
              <div class="{titleVisible ? 'animate-slide-up-3d' : 'translate-y-full opacity-0'} transition-all duration-1000 delay-200 ease-out">
                <span class="block bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hyphens-auto relative" lang="{$locale}" style="transform: translateZ(10px);">
                  {mounted ? $t('hero.title2') : 'to Reality'}
                </span>
              </div>
            </h1>
          </div>
        </div>

        <!-- Enhanced Subtitle with Wave Animation -->
        <div class="subtitle-trigger mb-8 sm:mb-12">
          <div class="max-w-none sm:max-w-2xl lg:max-w-3xl" 
               class:sm:ml-auto={$locale === 'ar'}>
            <div class="overflow-hidden">
              <p class="hero-subtitle {subtitleVisible ? 'animate-wave-in' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-400 text-gray-600 dark:text-gray-300 font-medium leading-relaxed break-words hyphens-auto"
                 style="font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: 1.7; transform: translateZ(5px);"
                 class:font-arabic={$locale === 'ar'} 
                 class:text-right={$locale === 'ar'}
                 class:leading-loose={$locale === 'ar'} 
                 lang="{$locale}">
                {mounted ? $t('hero.subtitle') : 'Discover Pioneer Consultants—where design transforms your vision into reality. With extensive experience in the construction industry, we specialise in creating innovative, sustainable structures tailored to your needs.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Enhanced Interactive Buttons -->
        <div class="buttons-trigger">
          <div class="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center sm:justify-start" 
               class:sm:justify-end={$locale === 'ar'}
               class:sm:flex-row-reverse={$locale === 'ar'}>
            <a href="/services" 
               class="btn {buttonsVisible ? 'animate-magnetic-rise' : 'scale-0 opacity-0'} transition-all duration-700 delay-600 group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transform-gpu inline-flex items-center justify-center magnetic-btn"
               style="font-size: clamp(0.875rem, 2vw, 0.875rem); transform: translateZ(15px);">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative whitespace-nowrap">{mounted ? $t('hero.cta1') : 'Explore Our Services'}</span>
              <!-- Magnetic effect elements -->
              <div class="absolute inset-0 rounded-xl border-2 border-white/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
            </a>
            
            <a href="/contact" 
               class="btn {buttonsVisible ? 'animate-magnetic-rise' : 'scale-0 opacity-0'} transition-all duration-700 delay-700 group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-gray-800 text-black dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-black dark:hover:border-white hover:shadow-xl hover:-translate-y-0.5 transform-gpu inline-flex items-center justify-center magnetic-btn"
               style="font-size: clamp(0.875rem, 2vw, 0.875rem); transform: translateZ(15px);">
              <div class="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative group-hover:text-white dark:group-hover:text-black transition-colors duration-300 whitespace-nowrap">{mounted ? $t('hero.cta2') : 'Start Your Project'}</span>
              <!-- Ripple effect -->
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </a>
          </div>
        </div>

        <!-- Performance Indicator -->
        <div class="fixed bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400 font-mono z-50">
          FPS: {fps}
        </div>

      </div>
    </div>
  </div>

  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/10 via-transparent to-transparent pointer-events-none"></div>
</section>

<style>
  /* Advanced CSS Animations */
  @keyframes slide-up-3d {
    from { 
      transform: translateY(100%) rotateX(90deg); 
      opacity: 0; 
    }
    to { 
      transform: translateY(0) rotateX(0deg); 
      opacity: 1; 
    }
  }
  
  @keyframes wave-in {
    from { 
      transform: translateY(30px) scale(0.95); 
      opacity: 0; 
    }
    to { 
      transform: translateY(0) scale(1); 
      opacity: 1; 
    }
  }
  
  @keyframes magnetic-rise {
    from { 
      transform: scale(0) rotateY(180deg) translateZ(15px); 
      opacity: 0; 
    }
    to { 
      transform: scale(1) rotateY(0deg) translateZ(15px); 
      opacity: 1; 
    }
  }

  .animate-slide-up-3d { 
    animation: slide-up-3d 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  .animate-wave-in { 
    animation: wave-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  .animate-magnetic-rise { 
    animation: magnetic-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }

  /* 3D Cube Styles */
  :global(.floating-cube) {
    transform-style: preserve-3d;
  }

  :global(.cube-face) {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }

  :global(.cube-face.front) { transform: rotateY(0deg) translateZ(calc(var(--cube-size, 50px) / 2)); }
  :global(.cube-face.back) { transform: rotateY(180deg) translateZ(calc(var(--cube-size, 50px) / 2)); }
  :global(.cube-face.right) { transform: rotateY(90deg) translateZ(calc(var(--cube-size, 50px) / 2)); }
  :global(.cube-face.left) { transform: rotateY(-90deg) translateZ(calc(var(--cube-size, 50px) / 2)); }
  :global(.cube-face.top) { transform: rotateX(90deg) translateZ(calc(var(--cube-size, 50px) / 2)); }
  :global(.cube-face.bottom) { transform: rotateX(-90deg) translateZ(calc(var(--cube-size, 50px) / 2)); }

  /* Enhanced Magnetic Button Effects */
  .magnetic-btn {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .magnetic-btn:hover {
    transform: translateZ(20px) translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(139, 92, 246, 0.3),
      0 10px 20px rgba(59, 130, 246, 0.2);
  }

  /* Advanced Typography */
  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Performance optimizations */
  .transform-gpu {
    transform: translateZ(0);
    will-change: transform;
  }

  /* Blueprint overlay styles */
  :global(.blueprint-overlay) {
    filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .magnetic-btn:hover {
      transform: none !important;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    .morphing-shape {
      opacity: 0.5 !important;
    }
    
    .hero-title {
      text-shadow: 2px 2px 0 currentColor !important;
    }
  }
</style>