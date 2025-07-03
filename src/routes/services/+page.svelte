<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  import ServiceCard from '$lib/components/ServiceCard.svelte';

  let mounted = false;
  let heroVisible = false;
  let servicesVisible = false;
  let clientTypesVisible = false;
  let sectorsVisible = false;
  let ctaVisible = false;

  // Enhanced services data from docs
  const services = [
    {
      title: 'services.bim.title',
      description: 'services.bim.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>`
    },
    {
      title: 'services.structural.title',
      description: 'services.structural.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>`
    },
    {
      title: 'services.drawings.title',
      description: 'services.drawings.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4"/>
      </svg>`
    },
    {
      title: 'services.interior.title',
      description: 'services.interior.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 21l4-7 4 7"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v2H3V5z"/>
      </svg>`
    },
    {
      title: 'services.visualization.title',
      description: 'services.visualization.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>`
    },
    {
      title: 'services.web.title',
      description: 'services.web.description',
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
      </svg>`
    }
  ];

  onMount(() => {
    mounted = true;
    locale.init();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-trigger')) heroVisible = true;
          if (entry.target.classList.contains('services-trigger')) servicesVisible = true;
          if (entry.target.classList.contains('client-types-trigger')) clientTypesVisible = true;
          if (entry.target.classList.contains('sectors-trigger')) sectorsVisible = true;
          if (entry.target.classList.contains('cta-trigger')) ctaVisible = true;
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.hero-trigger, .services-trigger, .client-types-trigger, .sectors-trigger, .cta-trigger');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>{mounted ? $t('services.title') : 'Our Services'} - Pioneer Consultants</title>
  <meta name="description" content={mounted ? $t('services.subtitle') : 'Comprehensive project management, cost control & design support'} />
</svelte:head>

<!-- Services Hero Section -->
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
           dir="{$locale === 'ar' ? 'rtl' : 'ltr'}"
           class:text-right={$locale === 'ar'} 
           class:sm:text-right={$locale === 'ar'}>
        
        <!-- Hero Content -->
        <div class="space-y-6 sm:space-y-8">
          <!-- Icon -->
          <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 flex justify-center
                      {$locale === 'ar' ? 'sm:justify-end' : 'sm:justify-start'}">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
            </div>
          </div>

          <h1 class="{heroVisible ? 'animate-slide-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-200 font-black text-black dark:text-white leading-[0.9]" 
              style="font-size: clamp(2.5rem, 8vw, 4.5rem);" 
              class:font-arabic={$locale === 'ar'}>
            <span class="block mb-2" lang="{$locale}">
              {mounted ? $t('services.title') : 'Our Services'}
            </span>
          </h1>
          
          <p class="{heroVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-400 text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-3xl
                     {$locale === 'ar' ? 'text-right leading-loose font-arabic mx-auto sm:ml-auto' : 'text-left'}"
             style="font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: {$locale === 'ar' ? '2' : '1.7'};"
             lang="{$locale}">
            {mounted ? $t('services.subtitle') : 'Comprehensive project management, cost control & design support with extensive expertise tailored to contractors, consultants, and clients.'}
          </p>

          <!-- Key Stats -->
          <div class="{heroVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-600 flex flex-wrap gap-4 justify-center
                      {$locale === 'ar' ? 'sm:justify-end' : 'sm:justify-start'}">
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">6 Core Services</span>
            </div>
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">All Client Types</span>
            </div>
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">West Midlands</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Main Services Grid -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="services-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{servicesVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
          Complete Service Portfolio
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
        <p class="{servicesVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto" 
           style="font-size: 0.875rem; line-height: 1.7;"
           class:font-arabic={$locale === 'ar'} 
           class:leading-loose={$locale === 'ar'}>
          From initial concept to project completion, we deliver comprehensive solutions that transform your vision into reality with precision and excellence.
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16">
        {#each services as service, i}
          <ServiceCard 
            title={service.title}
            description={service.description}
            icon={service.icon}
            delay={servicesVisible ? i * 100 : 0}
          />
        {/each}
      </div>
    </div>

  </div>
</section>

<!-- Client Types Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="client-types-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{clientTypesVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
          {mounted ? $t('services.clientTypes.title') : 'Services by Client Type'}
        </h2>
        <p class="{clientTypesVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" 
           style="font-size: 0.875rem; line-height: 1.7;"
           class:font-arabic={$locale === 'ar'} 
           class:leading-loose={$locale === 'ar'}>
          {mounted ? $t('services.clientTypes.subtitle') : 'Tailored solutions for every stakeholder in the construction process'}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <!-- For Clients -->
        <div class="{clientTypesVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-700/30">
          <div class="w-14 h-14 bg-purple-600 dark:bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('services.clientTypes.clients.title') : 'For Clients'}
          </h3>
          <ul class="space-y-3">
            {#each ['Employer agent', 'Bid preparation and administration', 'Contractor procurement and management', 'Contract management', 'Regular project reporting'] as service}
              <li class="flex items-start space-x-3" class:space-x-reverse={$locale === 'ar'}>
                <div class="flex-shrink-0 w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-300" class:font-arabic={$locale === 'ar'} class:text-right={$locale === 'ar'}>{service}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- For Contractors -->
        <div class="{clientTypesVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/30">
          <div class="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('services.clientTypes.contractors.title') : 'For Contractors'}
          </h3>
          <ul class="space-y-3">
            {#each ['Full range of Quantity surveying activities', 'Tender preparation', 'Preparing bill of quantities', 'Preparing time schedules', 'BIM modeling', 'Preparing financial reports', 'Contract handling and legal compliance'] as service}
              <li class="flex items-start space-x-3" class:space-x-reverse={$locale === 'ar'}>
                <div class="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-300" class:font-arabic={$locale === 'ar'} class:text-right={$locale === 'ar'}>{service}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- For Consultancies -->
        <div class="{clientTypesVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-700/30">
          <div class="w-14 h-14 bg-green-600 dark:bg-green-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('services.clientTypes.consultancies.title') : 'For Consultancies'}
          </h3>
          <ul class="space-y-3">
            {#each ['Proposal development', 'Architectural drawings', 'Structural design with calculations', 'Structural detailing', 'Interior design'] as service}
              <li class="flex items-start space-x-3" class:space-x-reverse={$locale === 'ar'}>
                <div class="flex-shrink-0 w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2"></div>
                <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-300" class:font-arabic={$locale === 'ar'} class:text-right={$locale === 'ar'}>{service}</span>
              </li>
            {/each}
          </ul>
        </div>

      </div>
    </div>

  </div>
</section>

<!-- Sectors Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="sectors-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{sectorsVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
          {mounted ? $t('services.sectors.title') : 'Sectors We Work In'}
        </h2>
        <p class="{sectorsVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400" 
           style="font-size: 0.875rem;"
           class:font-arabic={$locale === 'ar'}>
          {mounted ? $t('services.sectors.subtitle') : 'Delivering excellence across multiple construction sectors'}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        
        <!-- Infrastructure -->
        <div class="{sectorsVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-300 text-center group">
          <div class="w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 class="text-xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('services.sectors.infrastructure.title') : 'Infrastructure'}
          </h3>
          <p class="text-gray-600 dark:text-gray-400" 
             style="font-size: 0.875rem; line-height: 1.6;"
             class:font-arabic={$locale === 'ar'} 
             class:leading-loose={$locale === 'ar'}>
            {mounted ? $t('services.sectors.infrastructure.description') : 'Roads, bridges, utilities, and public works projects'}
          </p>
        </div>

        <!-- Construction -->
        <div class="{sectorsVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 text-center group">
          <div class="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <h3 class="text-xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('services.sectors.construction.title') : 'Construction'}
         </h3>
         <p class="text-gray-600 dark:text-gray-400" 
            style="font-size: 0.875rem; line-height: 1.6;"
            class:font-arabic={$locale === 'ar'} 
            class:leading-loose={$locale === 'ar'}>
           {mounted ? $t('services.sectors.construction.description') : 'Commercial, residential, and industrial buildings'}
         </p>
       </div>

     </div>
   </div>

 </div>
</section>

<!-- CTA Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
 
 <!-- Background Elements -->
 <div class="absolute inset-0 overflow-hidden">
   <div class="absolute top-0 left-0 w-full h-full bg-black/10"></div>
   <div class="absolute top-[10%] right-[10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-gentle"></div>
   <div class="absolute bottom-[10%] left-[10%] w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse-soft"></div>
 </div>

 <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div class="cta-trigger text-center">
     
     <div class="{ctaVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000">
       <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
         <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
         </svg>
       </div>
     </div>

     <h2 class="{ctaVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-200 text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6" class:font-arabic={$locale === 'ar'}>
       {mounted ? $t('services.cta.title') : 'Ready to Start Your Project?'}
     </h2>
     
     <p class="{ctaVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-400 text-white/90 max-w-3xl mx-auto mb-10" 
        style="font-size: 0.875rem; line-height: 1.7;"
        class:font-arabic={$locale === 'ar'} 
        class:leading-loose={$locale === 'ar'}>
       {mounted ? $t('services.cta.subtitle') : 'Let our expert team help you bring your vision to life with our comprehensive range of services across the West Midlands and surrounding areas.'}
     </p>

     <div class="{ctaVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-600 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
       <a href="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform-gpu group" 
          style="font-size: 0.875rem;">
         <span class="whitespace-nowrap">{mounted ? $t('services.cta.button') : 'Get Your Free Consultation'}</span>
         <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
         </svg>
       </a>
       
       <a href="/about" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 group" 
          style="font-size: 0.875rem;">
         <span class="whitespace-nowrap">Learn About Us</span>
         <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
         </svg>
       </a>
     </div>

     <!-- Contact Info -->
     <div class="{ctaVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-800 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
       
       <div class="text-center">
         <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
           <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
           </svg>
         </div>
         <p class="text-white/90 font-medium mb-1" style="font-size: 0.75rem;" class:font-arabic={$locale === 'ar'}>
           Email Us
         </p>
         <p class="text-white text-xs" class:font-arabic={$locale === 'ar'}>
           info@pioneerconsultants.com
         </p>
       </div>

       <div class="text-center">
         <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
           <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
           </svg>
         </div>
         <p class="text-white/90 font-medium mb-1" style="font-size: 0.75rem;" class:font-arabic={$locale === 'ar'}>
           Call Us
         </p>
         <p class="text-white text-xs" class:font-arabic={$locale === 'ar'}>
           +44 (0) 123 456 7890
         </p>
       </div>

       <div class="text-center">
         <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
           <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
           </svg>
         </div>
         <p class="text-white/90 font-medium mb-1" style="font-size: 0.75rem;" class:font-arabic={$locale === 'ar'}>
           Service Area
         </p>
         <p class="text-white text-xs" class:font-arabic={$locale === 'ar'}>
           West Midlands & Beyond
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