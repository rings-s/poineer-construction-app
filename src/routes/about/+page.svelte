<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';

  let mounted = false;
  let heroVisible = false;
  let visionVisible = false;
  let managerVisible = false;
  let servicesVisible = false;

  onMount(() => {
    mounted = true;
    locale.init();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-trigger')) heroVisible = true;
          if (entry.target.classList.contains('vision-trigger')) visionVisible = true;
          if (entry.target.classList.contains('manager-trigger')) managerVisible = true;
          if (entry.target.classList.contains('services-trigger')) servicesVisible = true;
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.hero-trigger, .vision-trigger, .manager-trigger, .services-trigger');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>{mounted ? $t('about.title') : 'About Us'} - Pioneer Consultants</title>
  <meta name="description" content={mounted ? $t('about.subtitle') : 'Pioneer Consultants combines creative vision with viability'} />
</svelte:head>

<!-- Hero Section with Animated SVG -->
<section class="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
  
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-[20%] left-[15%] w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-[20%] right-[15%] w-64 h-64 bg-gradient-to-tl from-blue-200/25 to-indigo-200/25 dark:from-blue-500/15 dark:to-indigo-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
  </div>

  <div class="relative z-10 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="hero-trigger grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Content Side -->
        <div class="lg:col-span-7 text-center lg:text-left" 
             class:text-right={$locale === 'ar'} 
             class:lg:text-right={$locale === 'ar'}
             class:lg:col-start-6={$locale === 'ar'}>
          
          <div class="space-y-6">
            <h1 class="{heroVisible ? 'animate-slide-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 font-black text-black dark:text-white leading-[0.9]" 
                style="font-size: clamp(2.5rem, 8vw, 4.5rem);" 
                class:font-arabic={$locale === 'ar'}>
              <span class="block mb-2" lang="{$locale}">
                {mounted ? $t('about.title') : 'Who We Are'}
              </span>
            </h1>
            
            <p class="{heroVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-300 font-medium leading-relaxed"
               style="font-size: 0.875rem; line-height: 1.7;"
               class:font-arabic={$locale === 'ar'} 
               class:text-right={$locale === 'ar'}
               class:leading-loose={$locale === 'ar'}>
              {mounted ? $t('about.subtitle') : 'Pioneer Consultants combines creative vision with viability'}
            </p>

            <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/30">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed font-medium"
                 style="font-size: 0.75rem; line-height: 1.6;"
                 class:font-arabic={$locale === 'ar'} 
                 class:text-right={$locale === 'ar'}>
                As an innovative startup, we specialize in comprehensive project management, cost control, and design support. Our expertise serves contractors, consultants, and clients across the West Midlands with cutting-edge solutions.
              </p>
            </div>

            <div class="{heroVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-600 flex flex-wrap gap-4 justify-center lg:justify-start" class:lg:justify-end={$locale === 'ar'}>
              <div class="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Innovation Focus</span>
              </div>
              <div class="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Expert Team</span>
              </div>
              <div class="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">West Midlands</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Animated SVG Side -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end" 
             class:lg:justify-start={$locale === 'ar'}
             class:lg:col-start-1={$locale === 'ar'}>
          <div class="relative">
            <!-- Main SVG Container -->
            <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1200 delay-300">
              <svg class="w-80 h-80 sm:w-96 sm:h-96" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                
                <!-- Background Circle -->
                <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" stroke-width="1" 
                        class="text-purple-200 dark:text-purple-700 animate-spin-slow" opacity="0.3"/>
                
                <!-- Building Structure -->
                <g class="animate-slide-up" style="animation-delay: 0.8s;">
                  <!-- Foundation -->
                  <rect x="120" y="320" width="160" height="20" fill="currentColor" 
                        class="text-gray-400 dark:text-gray-600"/>
                  
                  <!-- Main Building -->
                  <rect x="140" y="220" width="120" height="100" fill="none" stroke="currentColor" 
                        stroke-width="2" class="text-purple-600 dark:text-purple-400"/>
                  
                  <!-- Windows Grid -->
                  <g class="animate-fade-in" style="animation-delay: 1.2s;">
                    {#each Array(3) as _, row}
                      {#each Array(4) as _, col}
                        <rect x={155 + col * 22} y={235 + row * 25} width="12" height="15" 
                              fill="currentColor" class="text-blue-300 dark:text-blue-600" 
                              opacity="0.6"/>
                      {/each}
                    {/each}
                  </g>
                  
                  <!-- Roof -->
                  <polygon points="130,220 200,180 270,220" fill="none" stroke="currentColor" 
                           stroke-width="2" class="text-indigo-600 dark:text-indigo-400"/>
                </g>

                <!-- Construction Elements -->
                <g class="animate-bounce-slow" style="animation-delay: 1.5s;">
                  <!-- Crane -->
                  <line x1="320" y1="120" x2="320" y2="280" stroke="currentColor" 
                        stroke-width="3" class="text-orange-500 dark:text-orange-400"/>
                  <line x1="320" y1="140" x2="380" y2="140" stroke="currentColor" 
                        stroke-width="2" class="text-orange-500 dark:text-orange-400"/>
                  <line x1="370" y1="140" x2="370" y2="160" stroke="currentColor" 
                        stroke-width="2" class="text-orange-500 dark:text-orange-400"/>
                  
                  <!-- Blueprint -->
                  <rect x="80" y="300" width="40" height="30" fill="none" stroke="currentColor" 
                        stroke-width="1" class="text-blue-500 dark:text-blue-400"/>
                  <line x1="85" y1="310" x2="115" y2="310" stroke="currentColor" 
                        stroke-width="0.5" class="text-blue-500 dark:text-blue-400"/>
                  <line x1="85" y1="320" x2="115" y2="320" stroke="currentColor" 
                        stroke-width="0.5" class="text-blue-500 dark:text-blue-400"/>
                </g>

                <!-- Floating Icons -->
                <g class="animate-float" style="animation-delay: 2s;">
                  <!-- BIM Icon -->
                  <circle cx="100" cy="150" r="20" fill="currentColor" 
                          class="text-purple-100 dark:text-purple-900" opacity="0.8"/>
                  <rect x="90" y="140" width="20" height="20" fill="none" stroke="currentColor" 
                        stroke-width="1.5" class="text-purple-600 dark:text-purple-400"/>
                  
                  <!-- Structural Icon -->
                  <circle cx="320" cy="300" r="18" fill="currentColor" 
                          class="text-blue-100 dark:text-blue-900" opacity="0.8"/>
                  <polygon points="310,295 320,285 330,295 330,305 310,305" fill="none" stroke="currentColor" 
                           stroke-width="1.5" class="text-blue-600 dark:text-blue-400"/>
                </g>

                <!-- Connection Lines -->
                <g class="animate-gradient" style="animation-delay: 2.5s;">
                  <line x1="100" y1="170" x2="140" y2="240" stroke="url(#gradient1)" 
                        stroke-width="1" opacity="0.6" stroke-dasharray="4,4"/>
                  <line x1="300" y1="300" x2="260" y2="250" stroke="url(#gradient2)" 
                        stroke-width="1" opacity="0.6" stroke-dasharray="4,4"/>
                </g>

                <!-- Gradients -->
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Vision Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="vision-trigger grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      <!-- Vision Content -->
      <div class="space-y-8" class:order-2={$locale === 'ar'} class:lg:order-1={$locale === 'ar'}>
        <div class="space-y-6">
          <div class="flex items-center space-x-4" class:space-x-reverse={$locale === 'ar'}>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h2 class="{visionVisible ? 'animate-slide-up' : 'translate-y-4 opacity-0'} transition-all duration-1000 text-xl sm:text-2xl font-black text-black dark:text-white" class:font-arabic={$locale === 'ar'}>
              {mounted ? $t('about.vision.title') : 'Our Vision'}
            </h2>
          </div>
          
          <p class="{visionVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-700 dark:text-gray-300 leading-relaxed"
             style="font-size: 0.875rem; line-height: 1.7;"
             class:font-arabic={$locale === 'ar'} 
             class:text-right={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'}>
            {mounted ? $t('about.vision.description') : 'To be the most trusted and innovative construction consultancy firm in the West Midlands and beyond, setting new standards in design excellence and project delivery.'}
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center space-x-4" class:space-x-reverse={$locale === 'ar'}>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            <h2 class="{visionVisible ? 'animate-slide-up' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-100 text-xl sm:text-2xl font-black text-black dark:text-white" class:font-arabic={$locale === 'ar'}>
              {mounted ? $t('about.mission.title') : 'Our Mission'}
            </h2>
          </div>
          
          <p class="{visionVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-300 text-gray-700 dark:text-gray-300 leading-relaxed"
             style="font-size: 0.875rem; line-height: 1.7;"
             class:font-arabic={$locale === 'ar'} 
             class:text-right={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'}>
            {mounted ? $t('about.mission.description') : 'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client. We specialize in creating innovative, sustainable structures tailored to your needs.'}
          </p>
        </div>
      </div>

      <!-- Stats Display -->
      <div class="grid grid-cols-2 gap-6" class:order-1={$locale === 'ar'} class:lg:order-2={$locale === 'ar'}>
        {#each [
          { number: '25+', label: 'Years Experience', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'purple' },
          { number: '500+', label: 'Projects Delivered', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'blue' },
          { number: '99%', label: 'Client Satisfaction', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'green' },
          { number: '24/7', label: 'Support Available', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'indigo' }
        ] as stat, i}
          <div class="{visionVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-{(i + 2) * 100} bg-gradient-to-br from-{stat.color}-50 to-{stat.color}-100 dark:from-{stat.color}-900/20 dark:to-{stat.color}-800/20 rounded-2xl p-6 text-center border border-{stat.color}-200/50 dark:border-{stat.color}-700/30">
            <div class="w-12 h-12 bg-{stat.color}-600 dark:bg-{stat.color}-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={stat.icon}/>
              </svg>
            </div>
            <div class="text-2xl font-black text-{stat.color}-600 dark:text-{stat.color}-400 mb-2">
              {stat.number}
            </div>
            <div class="text-xs font-medium text-gray-600 dark:text-gray-400" class:font-arabic={$locale === 'ar'}>
              {stat.label}
            </div>
          </div>
        {/each}
      </div>

    </div>
  </div>
</section>

<!-- Manager Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="manager-trigger">
      <div class="text-center mb-12">
        <h2 class="{managerVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
          Leadership Excellence
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
      </div>

      <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          <!-- Manager Image -->
          <div class="text-center">
            <div class="{managerVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-200 relative">
              <div class="w-48 h-48 mx-auto mb-6 relative">
                <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-xl">
                  <svg class="w-24 h-24 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
        <!-- Manager Info -->
        <div class="lg:col-span-2 text-center lg:text-left" class:lg:text-right={$locale === 'ar'}>
          <div class="{managerVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-400">
            <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white mb-2" class:font-arabic={$locale === 'ar'}>
              Eng. Mohammed Bashir
            </h3>
            <p class="font-medium text-purple-600 dark:text-purple-400 mb-6" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
              Managing Director & Lead Consultant
            </p>
            
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed" 
                 style="font-size: 0.875rem; line-height: 1.7;"
                 class:font-arabic={$locale === 'ar'} 
                 class:text-right={$locale === 'ar'}
                 class:leading-loose={$locale === 'ar'}>
                With extensive experience in the construction industry, Mohammed leads our vision of transforming innovative design concepts into practical realities. His expertise spans across all aspects of construction consultancy, from initial planning to project completion.
              </p>
              
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed" 
                 style="font-size: 0.875rem; line-height: 1.7;"
                 class:font-arabic={$locale === 'ar'} 
                 class:text-right={$locale === 'ar'}
                 class:leading-loose={$locale === 'ar'}>
                Under his leadership, Pioneer Consultants has established itself as a trusted partner for clients seeking comprehensive project management, cost control, and design support across the West Midlands region.
              </p>
            </div>
            
            <!-- Skills Tags -->
            <div class="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start" class:lg:justify-end={$locale === 'ar'}>
              {#each ['BIM Modeling', 'Project Management', 'Structural Design', 'Cost Control'] as skill}
                <span class="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200/50 dark:border-purple-700/30" 
                      style="font-size: 0.75rem; font-weight: 500;">
                  {skill}
                </span>
              {/each}
            </div>
            
            <!-- Contact CTA -->
            <div class="mt-8">
              <a href="/contact" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform-gpu" 
                 style="font-size: 0.875rem;">
                <span class="whitespace-nowrap">Connect with Leadership</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</section>
