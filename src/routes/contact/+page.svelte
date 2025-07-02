<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  import ContactForm from '$lib/components/ContactForm.svelte';

  let mounted = false;
  let heroVisible = false;
  let formVisible = false;
  let infoVisible = false;

  onMount(() => {
    mounted = true;
    locale.init();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-trigger')) heroVisible = true;
          if (entry.target.classList.contains('form-trigger')) formVisible = true;
          if (entry.target.classList.contains('info-trigger')) infoVisible = true;
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.hero-trigger, .form-trigger, .info-trigger');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  });

  function handleFormSuccess(event) {
    console.log('Form submitted successfully:', event.detail);
  }
</script>

<svelte:head>
  <title>{mounted ? $t('contact.title') : 'Contact Us'} - Pioneer Consultants</title>
  <meta name="description" content={mounted ? $t('contact.subtitle') : 'Get in touch with Pioneer Consultants'} />
</svelte:head>

<!-- Contact Hero Section -->
<section class="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
  
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-[20%] left-[15%] w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-float-gentle"></div>
    <div class="absolute bottom-[20%] right-[15%] w-64 h-64 bg-gradient-to-tl from-blue-200/25 to-indigo-200/25 dark:from-blue-500/15 dark:to-indigo-500/15 rounded-full blur-3xl animate-pulse-soft"></div>
    
    <div class="absolute inset-0 opacity-[0.008] dark:opacity-[0.015]">
      <div class="grid grid-cols-16 gap-2 h-full p-8">
        {#each Array(128) as _}
          <div class="bg-gray-600 dark:bg-gray-400 rounded-sm opacity-50"></div>
        {/each}
      </div>
    </div>
  </div>

  <div class="relative z-10 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="hero-trigger text-center sm:text-left" 
           class:text-right={$locale === 'ar'} 
           class:sm:text-right={$locale === 'ar'}>
        
        <!-- Hero Content -->
        <div class="space-y-6 sm:space-y-8">
          <!-- Icon -->
          <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 flex justify-center sm:justify-start" class:sm:justify-end={$locale === 'ar'}>
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>

          <h1 class="{heroVisible ? 'animate-slide-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-200 font-black text-black dark:text-white leading-[0.9]" 
              style="font-size: clamp(2.5rem, 8vw, 4.5rem);" 
              class:font-arabic={$locale === 'ar'}>
            <span class="block mb-2" lang="{$locale}">
              {mounted ? $t('contact.hero.title') : "Let's Start Your Next Project Together"}
            </span>
          </h1>
          
          <p class="{heroVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-400 text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-3xl"
             style="font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: 1.7;"
             class:font-arabic={$locale === 'ar'} 
             class:text-right={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'} 
             class:mx-auto={$locale === 'ar'}
             class:sm:ml-auto={$locale === 'ar'}
             lang="{$locale}">
            {mounted ? $t('contact.hero.subtitle') : 'Ready to transform your vision into reality? Our expert team at Pioneer Consultants is here to help across the West Midlands and surrounding areas.'}
          </p>

          <!-- Contact Methods -->
          <div class="{heroVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-600 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl" class:mx-auto={$locale === 'ar'} class:sm:ml-auto={$locale === 'ar'}>
            
            <div class="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-3 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50" class:space-x-reverse={$locale === 'ar'}>
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class:text-right={$locale === 'ar'}>
                <p class="text-xs font-medium text-gray-900 dark:text-white" class:font-arabic={$locale === 'ar'}>Email Response</p>
                <p class="text-xs text-gray-600 dark:text-gray-400" class:font-arabic={$locale === 'ar'}>Within 24 hours</p>
              </div>
            </div>

            <div class="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-3 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50" class:space-x-reverse={$locale === 'ar'}>
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div class:text-right={$locale === 'ar'}>
                <p class="text-xs font-medium text-gray-900 dark:text-white" class:font-arabic={$locale === 'ar'}>Phone Consultation</p>
                <p class="text-xs text-gray-600 dark:text-gray-400" class:font-arabic={$locale === 'ar'}>Free initial call</p>
              </div>
            </div>

            <div class="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-3 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50" class:space-x-reverse={$locale === 'ar'}>
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class:text-right={$locale === 'ar'}>
                <p class="text-xs font-medium text-gray-900 dark:text-white" class:font-arabic={$locale === 'ar'}>Local Service</p>
                <p class="text-xs text-gray-600 dark:text-gray-400" class:font-arabic={$locale === 'ar'}>West Midlands</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="form-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{formVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
          {mounted ? $t('contact.form.title') : 'Send us a Message'}
        </h2>
        <p class="{formVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" 
           style="font-size: 0.875rem; line-height: 1.7;"
           class:font-arabic={$locale === 'ar'} 
           class:leading-loose={$locale === 'ar'}>
          {mounted ? $t('contact.form.subtitle') : "Fill out the form below and we'll get back to you within 24 hours"}
        </p>
      </div>
      
      <!-- Contact Form -->
      <div class="{formVisible ? 'animate-scale-in' : 'scale-95 opacity-0'} transition-all duration-1000 delay-400">
        <ContactForm on:success={handleFormSuccess} />
      </div>
    </div>

  </div>
</section>

<!-- Contact Information Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="info-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{infoVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
          Get in Touch Directly
        </h2>
        <p class="{infoVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400" 
           style="font-size: 0.875rem;"
           class:font-arabic={$locale === 'ar'}>
          Multiple ways to reach our expert team
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        
        <!-- Email -->
        <div class="{infoVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-300 text-center bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-black text-black dark:text-white mb-3" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('contact.info.email.title') : 'Email Us'}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
            Get a detailed response within 24 hours
          </p>
          <a href="mailto:info@pioneerconsultants.com" class="text-green-600 dark:text-green-400 font-medium hover:underline" style="font-size: 0.875rem;">
            {mounted ? $t('contact.info.email.value') : 'info@pioneerconsultants.com'}
          </a>
        </div>

        <!-- Phone -->
        <div class="{infoVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 text-center bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 class="text-lg font-black text-black dark:text-white mb-3" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('contact.info.phone.title') : 'Call Us'}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
            Free consultation and project discussion
          </p>
          <a href="tel:+441234567890" class="text-blue-600 dark:text-blue-400 font-medium hover:underline" style="font-size: 0.875rem;">
            {mounted ? $t('contact.info.phone.value') : '+44 (0) 123 456 7890'}
          </a>
        </div>

        <!-- Location -->
        <div class="{infoVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-500 text-center bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-black text-black dark:text-white mb-3" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('contact.info.location.title') : 'Service Area'}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
            Local expertise with regional coverage
          </p>
          <p class="text-purple-600 dark:text-purple-400 font-medium" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('contact.info.location.value') : 'West Midlands & Surrounding Areas'}
          </p>
        </div>

      </div>
    </div>

  </div>
</section>

<style>
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scale-in {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-float-gentle { animation: float-gentle 8s ease-in-out infinite; }
  .animate-pulse-soft { animation: pulse 4s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-scale-in { animation: scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

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
    .animate-pulse-soft,
    .animate-slide-up,
    .animate-fade-in,
    .animate-scale-in {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
</style>