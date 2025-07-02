<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';

  let mounted = false;
  let heroRef;

  onMount(() => {
    mounted = true;
    locale.init();

    // Enhanced parallax mouse movement
    const handleMouseMove = (e) => {
      if (!heroRef) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 12;
      const y = (clientY / innerHeight - 0.5) * 12;
      
      heroRef.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  // Intersection Observer for scroll animations
  let titleVisible = false;
  let subtitleVisible = false;
  let buttonsVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('title-trigger')) titleVisible = true;
          if (entry.target.classList.contains('subtitle-trigger')) subtitleVisible = true;
          if (entry.target.classList.contains('buttons-trigger')) buttonsVisible = true;
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.title-trigger, .subtitle-trigger, .buttons-trigger');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
  
  <!-- Advanced Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Primary Advanced Orbs -->
    <div class="absolute top-[10%] left-[10%] w-96 h-96 bg-gradient-to-br from-blue-300/40 via-purple-300/30 to-indigo-300/40 dark:from-blue-500/30 dark:via-purple-500/20 dark:to-indigo-500/30 rounded-full blur-3xl animate-orbital-1"></div>
    <div class="absolute bottom-[10%] right-[10%] w-80 h-80 bg-gradient-to-tl from-purple-300/35 via-pink-300/25 to-rose-300/35 dark:from-purple-500/25 dark:via-pink-500/15 dark:to-rose-500/25 rounded-full blur-3xl animate-orbital-2"></div>
    <div class="absolute top-[40%] left-[40%] w-64 h-64 bg-gradient-to-r from-indigo-300/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-500/30 dark:via-blue-500/20 dark:to-cyan-500/30 rounded-full blur-3xl animate-orbital-3"></div>
    <div class="absolute top-[20%] right-[30%] w-48 h-48 bg-gradient-to-bl from-cyan-300/30 via-teal-300/25 to-emerald-300/30 dark:from-cyan-500/20 dark:via-teal-500/15 dark:to-emerald-500/20 rounded-full blur-2xl animate-orbital-4"></div>
    
    <!-- Geometric Patterns -->
    <div class="absolute inset-0 opacity-[0.012] dark:opacity-[0.025]">
      <div class="grid grid-cols-24 gap-px h-full">
        {#each Array(480) as _, i}
          <div class="bg-gray-700 dark:bg-gray-300 animate-pulse-wave" style="animation-delay: {(i % 24) * 0.02}s; animation-duration: {4 + (i % 3)}s;"></div>
        {/each}
      </div>
    </div>

    <!-- Advanced Floating Elements -->
    {#each Array(12) as _, i}
      <div 
        class="absolute w-2 h-2 bg-gradient-to-r from-blue-400/50 via-purple-400/40 to-indigo-400/50 dark:from-blue-300/70 dark:via-purple-300/60 dark:to-indigo-300/70 rounded-full animate-float-particle"
        style="
          left: {Math.random() * 100}%; 
          top: {Math.random() * 100}%; 
          animation-delay: {i * 0.6}s;
          animation-duration: {6 + (i % 4)}s;
        "
      ></div>
    {/each}

    <!-- Mesh Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/20 to-transparent dark:via-blue-950/20 animate-mesh-shift"></div>
  </div>

  <!-- Content Container with Perfect Typography -->
  <div bind:this={heroRef} class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-transform duration-75 ease-out">
    
    <!-- Main Content with RTL Support -->
    <div class="text-center sm:text-left" class:text-right={$locale === 'ar'} class:sm:text-right={$locale === 'ar'}>
      
      <!-- Enhanced Title with Perfect Arabic Support -->
      <div class="title-trigger mb-8 sm:mb-12">
        <div class="overflow-hidden">
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.82] text-black dark:text-white"
              class:font-arabic={$locale === 'ar'}
              class:tracking-tight={$locale === 'en'}
              class:tracking-normal={$locale === 'ar'}>
            <div class="{titleVisible ? 'animate-slide-up-elegant' : 'translate-y-full opacity-0'} transition-all duration-1000 ease-out">
              <span class="block" class:mb-3={$locale === 'ar'} class:mb-2={$locale === 'en'}>
                {mounted ? $t('hero.title1') : 'Bringing Vision'}
              </span>
            </div>
            <div class="{titleVisible ? 'animate-slide-up-elegant' : 'translate-y-full opacity-0'} transition-all duration-1000 delay-200 ease-out">
              <span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
                {mounted ? $t('hero.title2') : 'to Reality'}
              </span>
            </div>
          </h1>
        </div>
      </div>

      <!-- Perfect Arabic Subtitle with Enhanced Typography -->
      <div class="subtitle-trigger mb-12 sm:mb-16" 
           class:max-w-none={$locale === 'ar'} 
           class:max-w-3xl={$locale === 'en'}
           class:sm:max-w-4xl={$locale === 'ar'}
           class:sm:max-w-3xl={$locale === 'en'}>
        <div class="overflow-hidden">
          <p class="{subtitleVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-400 leading-relaxed font-medium text-gray-600 dark:text-gray-300"
             class:font-arabic={$locale === 'ar'}
             class:text-base={$locale === 'ar'}
             class:text-sm={$locale === 'en'}
             class:tracking-wide={$locale === 'en'}
             class:tracking-normal={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'}
             class:leading-relaxed={$locale === 'en'}
             class:text-right={$locale === 'ar'}
             class:text-left={$locale === 'en'}
             class:sm:text-right={$locale === 'ar'}
             class:sm:text-left={$locale === 'en'}>
            {mounted ? $t('hero.subtitle') : 'Discover Pioneer Consultants—where design transforms your vision into reality. With extensive experience in the construction industry, we specialise in creating innovative, sustainable structures tailored to your needs.'}
          </p>
        </div>
      </div>

      <!-- Enhanced Buttons with RTL Support -->
      <div class="buttons-trigger">
        <div class="flex flex-col sm:flex-row gap-5 sm:gap-7 items-center justify-center sm:justify-start"
             class:sm:justify-end={$locale === 'ar'}
             class:flex-col-reverse={$locale === 'ar'}
             class:sm:flex-row-reverse={$locale === 'ar'}>
          
          <button class="{buttonsVisible ? 'animate-scale-in-spring' : 'scale-0 opacity-0'} 
                         transition-all duration-700 delay-600 group relative overflow-hidden 
                         w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black 
                         font-bold text-sm rounded-xl hover:shadow-2xl hover:shadow-black/25 
                         dark:hover:shadow-white/25 hover:-translate-y-1 transform-gpu">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
            <span class="relative z-10">{mounted ? $t('hero.cta1') : 'Explore Our Services'}</span>
          </button>
          
          <button class="{buttonsVisible ? 'animate-scale-in-spring' : 'scale-0 opacity-0'} 
                         transition-all duration-700 delay-700 group relative overflow-hidden 
                         w-full sm:w-auto px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                         text-black dark:text-white font-bold text-sm rounded-xl 
                         border-2 border-gray-200 dark:border-gray-600 
                         hover:border-black dark:hover:border-white hover:shadow-2xl 
                         hover:shadow-black/15 dark:hover:shadow-white/15 hover:-translate-y-1 transform-gpu">
            <div class="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
            <span class="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-400">{mounted ? $t('hero.cta2') : 'Start Your Project'}</span>
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- Enhanced Gradient Overlays -->
  <div class="absolute inset-0 bg-gradient-to-t from-white/25 dark:from-black/25 via-transparent to-transparent pointer-events-none"></div>
  <div class="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 dark:via-blue-950/10 to-transparent pointer-events-none"></div>
</section>

<style>
  /* Advanced orbital animations */
  @keyframes orbital-1 {
    0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
    25% { transform: translateX(40px) translateY(-30px) rotate(90deg) scale(1.1); }
    50% { transform: translateX(-20px) translateY(-60px) rotate(180deg) scale(0.9); }
    75% { transform: translateX(-50px) translateY(-20px) rotate(270deg) scale(1.05); }
    100% { transform: translateX(0) translateY(0) rotate(360deg) scale(1); }
  }

  @keyframes orbital-2 {
    0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
    30% { transform: translateX(-35px) translateY(25px) rotate(108deg) scale(1.15); }
    60% { transform: translateX(20px) translateY(50px) rotate(216deg) scale(0.85); }
    90% { transform: translateX(45px) translateY(15px) rotate(324deg) scale(1.1); }
    100% { transform: translateX(0) translateY(0) rotate(360deg) scale(1); }
  }

  @keyframes orbital-3 {
    0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
    20% { transform: translateX(25px) translateY(-40px) rotate(72deg) scale(1.2); }
    40% { transform: translateX(-30px) translateY(-25px) rotate(144deg) scale(0.8); }
    60% { transform: translateX(-15px) translateY(35px) rotate(216deg) scale(1.1); }
    80% { transform: translateX(40px) translateY(20px) rotate(288deg) scale(0.9); }
    100% { transform: translateX(0) translateY(0) rotate(360deg) scale(1); }
  }

  @keyframes orbital-4 {
    0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
    33% { transform: translateX(-20px) translateY(-35px) rotate(120deg) scale(1.3); }
    66% { transform: translateX(30px) translateY(25px) rotate(240deg) scale(0.7); }
    100% { transform: translateX(0) translateY(0) rotate(360deg) scale(1); }
  }

  @keyframes float-particle {
    0%, 100% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); opacity: 0.4; }
    25% { transform: translateY(-25px) translateX(15px) scale(1.2) rotate(90deg); opacity: 0.7; }
    50% { transform: translateY(-10px) translateX(-20px) scale(0.8) rotate(180deg); opacity: 0.5; }
    75% { transform: translateY(20px) translateX(10px) scale(1.1) rotate(270deg); opacity: 0.6; }
  }

  @keyframes pulse-wave {
    0%, 100% { opacity: 0.01; transform: scale(1); }
    50% { opacity: 0.03; transform: scale(1.05); }
  }

  @keyframes mesh-shift {
    0%, 100% { transform: translateX(0%); }
    50% { transform: translateX(2%); }
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-orbital-1 { animation: orbital-1 20s ease-in-out infinite; }
  .animate-orbital-2 { animation: orbital-2 25s ease-in-out infinite; }
  .animate-orbital-3 { animation: orbital-3 18s ease-in-out infinite; }
  .animate-orbital-4 { animation: orbital-4 22s ease-in-out infinite; }
  .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
  .animate-pulse-wave { animation: pulse-wave 5s ease-in-out infinite; }
  .animate-mesh-shift { animation: mesh-shift 12s ease-in-out infinite; }
  .animate-gradient-shift { 
    background-size: 200% 200%; 
    animation: gradient-shift 4s ease infinite; 
  }

  /* Enhanced typography for Arabic */
  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1, 'kern' 1;
    text-rendering: optimizeLegibility;
    word-spacing: 0.05em;
    letter-spacing: 0;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .animate-orbital-1,
    .animate-orbital-2,
    .animate-orbital-3,
    .animate-orbital-4,
    .animate-float-particle,
    .animate-pulse-wave,
    .animate-mesh-shift,
    .animate-gradient-shift {
      animation: none;
    }
  }
</style>