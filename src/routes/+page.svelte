<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';

  let mounted = false;
  let heroRef;

  onMount(() => {
    mounted = true;
    locale.init();

    // Parallax effect for hero
    const handleMouseMove = (e) => {
      if (!heroRef) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 6;
      const y = (clientY / innerHeight - 0.5) * 6;
      
      heroRef.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  // Hero animations
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

    setTimeout(() => {
      const elements = document.querySelectorAll('.title-trigger, .subtitle-trigger, .buttons-trigger');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  });
</script>

<!-- Full Screen Hero Section -->
<section class="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
  
  <!-- Simplified Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-[20%] left-[15%] w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-float-gentle"></div>
    <div class="absolute bottom-[20%] right-[15%] w-64 h-64 bg-gradient-to-tl from-blue-200/25 to-indigo-200/25 dark:from-blue-500/15 dark:to-indigo-500/15 rounded-full blur-3xl animate-float-gentle-reverse"></div>
    
    <div class="absolute inset-0 opacity-[0.008] dark:opacity-[0.015]">
      <div class="grid grid-cols-16 gap-2 h-full p-8">
        {#each Array(128) as _}
          <div class="bg-gray-600 dark:bg-gray-400 rounded-sm opacity-50"></div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Vertically Centered Content -->
  <div bind:this={heroRef} class="relative z-10 w-full transition-transform duration-75 ease-out">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center sm:text-left" 
           class:text-right={$locale === 'ar'} 
           class:sm:text-right={$locale === 'ar'}>
        
        <!-- Title -->
        <div class="title-trigger mb-6 sm:mb-8">
          <div class="overflow-hidden">
            <h1 class="font-black text-black dark:text-white leading-[0.9] break-words" 
                style="font-size: clamp(2.5rem, 8vw, 5rem);" 
                class:font-arabic={$locale === 'ar'}>
              <div class="{titleVisible ? 'animate-slide-up' : 'translate-y-full opacity-0'} transition-all duration-1000 ease-out">
                <span class="block mb-2 hyphens-auto" lang="{$locale}">
                  {mounted ? $t('hero.title1') : 'Bringing Vision'}
                </span>
              </div>
              <div class="{titleVisible ? 'animate-slide-up' : 'translate-y-full opacity-0'} transition-all duration-1000 delay-200 ease-out">
                <span class="block bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hyphens-auto" lang="{$locale}">
                  {mounted ? $t('hero.title2') : 'to Reality'}
                </span>
              </div>
            </h1>
          </div>
        </div>

        <!-- Subtitle -->
        <div class="subtitle-trigger mb-8 sm:mb-12">
          <div class="max-w-none sm:max-w-2xl lg:max-w-3xl" 
               class:sm:ml-auto={$locale === 'ar'}>
            <div class="overflow-hidden">
              <p class="{subtitleVisible ? 'animate-fade-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-400 text-gray-600 dark:text-gray-300 font-medium leading-relaxed break-words hyphens-auto"
                 style="font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: 1.7;"
                 class:font-arabic={$locale === 'ar'} 
                 class:text-right={$locale === 'ar'}
                 class:leading-loose={$locale === 'ar'} 
                 lang="{$locale}">
                {mounted ? $t('hero.subtitle') : 'Discover Pioneer Consultants—where design transforms your vision into reality. With extensive experience in the construction industry, we specialise in creating innovative, sustainable structures tailored to your needs.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="buttons-trigger">
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center sm:justify-start" 
               class:sm:justify-end={$locale === 'ar'}
               class:sm:flex-row-reverse={$locale === 'ar'}>
            <a href="/services" class="{buttonsVisible ? 'animate-scale-up' : 'scale-0 opacity-0'} transition-all duration-700 delay-600 group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transform-gpu inline-flex items-center justify-center" style="font-size: clamp(0.875rem, 2vw, 0.875rem);">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative whitespace-nowrap">{mounted ? $t('hero.cta1') : 'Explore Our Services'}</span>
            </a>
            <a href="/contact" class="{buttonsVisible ? 'animate-scale-up' : 'scale-0 opacity-0'} transition-all duration-700 delay-700 group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-gray-800 text-black dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-black dark:hover:border-white hover:shadow-xl hover:-translate-y-0.5 transform-gpu inline-flex items-center justify-center" style="font-size: clamp(0.875rem, 2vw, 0.875rem);">
              <div class="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative group-hover:text-white dark:group-hover:text-black transition-colors duration-300 whitespace-nowrap">{mounted ? $t('hero.cta2') : 'Start Your Project'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/10 via-transparent to-transparent pointer-events-none"></div>
</section>

<style>
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  @keyframes float-gentle-reverse {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
  }

  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fade-up {
    from { transform: translateY(1.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes scale-up {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-float-gentle { animation: float-gentle 8s ease-in-out infinite; }
  .animate-float-gentle-reverse { animation: float-gentle-reverse 10s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-up { animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-scale-up { animation: scale-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-float-gentle,
    .animate-float-gentle-reverse,
    .animate-slide-up,
    .animate-fade-up,
    .animate-scale-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
</style>