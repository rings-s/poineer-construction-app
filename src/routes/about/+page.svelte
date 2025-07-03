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

<!-- Hero Section with Enhanced Arabic Support -->
<section class="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
  
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-[20%] left-[15%] w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-[20%] right-[15%] w-64 h-64 bg-gradient-to-tl from-blue-200/25 to-indigo-200/25 dark:from-blue-500/15 dark:to-indigo-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
  </div>

  <div class="relative z-10 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Proper RTL/LTR Grid Layout -->
      <div class="hero-trigger grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" 
           dir="{$locale === 'ar' ? 'rtl' : 'ltr'}">
        
        <!-- Content Side - Proper Arabic positioning -->
        <div class="order-2 lg:order-1 lg:col-span-7 text-center 
                    {$locale === 'ar' ? 'lg:order-2 lg:col-span-7 lg:col-start-6 text-right lg:text-right' : 'lg:text-left'}">
          
          <div class="space-y-6">
            <h1 class="{heroVisible ? 'animate-slide-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 font-black text-black dark:text-white leading-[0.9]" 
                style="font-size: clamp(2.5rem, 8vw, 4.5rem);" 
                class:font-arabic={$locale === 'ar'}>
              <span class="block mb-2" lang="{$locale}">
                {mounted ? $t('about.title') : 'Who We Are'}
              </span>
            </h1>
            
            <p class="{heroVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-300 font-medium leading-relaxed
                      {$locale === 'ar' ? 'text-right leading-loose font-arabic' : 'text-left'}"
               style="font-size: 0.875rem; line-height: {$locale === 'ar' ? '2' : '1.7'};">
              {mounted ? $t('about.subtitle') : 'Pioneer Consultants combines creative vision with viability'}
            </p>

            <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/30">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed font-medium
                        {$locale === 'ar' ? 'text-right leading-loose font-arabic' : 'text-left'}"
                 style="font-size: 0.75rem; line-height: {$locale === 'ar' ? '2' : '1.6'};">
                As an innovative startup, we specialize in comprehensive project management, cost control, and design support. Our expertise serves contractors, consultants, and clients across the West Midlands with cutting-edge solutions.
              </p>
            </div>

            <div class="{heroVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-600 flex flex-wrap gap-4 justify-center 
                        {$locale === 'ar' ? 'lg:justify-end' : 'lg:justify-start'}">
              <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm
                          {$locale === 'ar' ? 'flex-row-reverse' : ''}">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">Innovation Focus</span>
              </div>
              <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm
                          {$locale === 'ar' ? 'flex-row-reverse' : ''}">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">Expert Team</span>
              </div>
              <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm
                          {$locale === 'ar' ? 'flex-row-reverse' : ''}">
                <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">West Midlands</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Larger Professional SVG - Proper Arabic positioning -->
        <div class="order-1 lg:order-2 lg:col-span-5 flex justify-center 
                    {$locale === 'ar' ? 'lg:order-1 lg:col-span-5 lg:col-start-1 lg:justify-start' : 'lg:justify-end'}">
          <div class="relative">
            <!-- Enlarged SVG Container -->
            <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1200 delay-300">
              <svg class="w-[28rem] h-[28rem] sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem]" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                
                <!-- Advanced Background Elements -->
                <defs>
                  <!-- Professional Gradients -->
                  <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                  </linearGradient>
                  
                  <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
                  </linearGradient>
                  
                  <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
                  </linearGradient>

                  <linearGradient id="constructionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff9a9e;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fecfef;stop-opacity:1" />
                  </linearGradient>

                  <!-- Enhanced Drop Shadow Filter -->
                  <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.15"/>
                  </filter>
                  
                  <!-- Enhanced Glow Effect -->
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <!-- Animated Gradient -->
                  <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1">
                      <animate attributeName="stop-color" values="#667eea;#764ba2;#f093fb;#667eea" dur="8s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1">
                      <animate attributeName="stop-color" values="#764ba2;#f093fb;#667eea;#764ba2" dur="8s" repeatCount="indefinite"/>
                    </stop>
                  </linearGradient>
                </defs>

                <!-- Dynamic Background Grid -->
                <g class="animate-pulse-slow" opacity="0.08">
                  {#each Array(12) as _, i}
                    <line x1={60 + i * 45} y1="60" x2={60 + i * 45} y2="540" 
                          stroke="currentColor" stroke-width="0.5" 
                          class="text-purple-600 dark:text-purple-400"/>
                    <line x1="60" y1={60 + i * 45} x2="540" y2={60 + i * 45} 
                          stroke="currentColor" stroke-width="0.5" 
                          class="text-purple-600 dark:text-purple-400"/>
                  {/each}
                </g>

                <!-- Main Building Complex - Enhanced -->
                <g class="animate-slide-up" style="animation-delay: 0.8s;" filter="url(#dropShadow)">
                  
                  <!-- Enhanced Foundation Platform -->
                  <rect x="120" y="480" width="360" height="40" fill="url(#buildingGradient)" 
                        rx="20" opacity="0.9"/>
                  <rect x="130" y="475" width="340" height="15" fill="url(#accentGradient)" 
                        rx="7" opacity="0.6"/>
                  
                  <!-- Main Corporate Tower -->
                  <rect x="200" y="220" width="160" height="260" fill="none" 
                        stroke="url(#buildingGradient)" stroke-width="4" rx="12"/>
                  
                  <!-- Secondary Building -->
                  <rect x="380" y="300" width="120" height="180" fill="none" 
                        stroke="url(#accentGradient)" stroke-width="3" rx="8"/>
                  
                  <!-- Building Floors Indication -->
                  {#each Array(10) as _, floor}
                    <line x1="210" y1={230 + floor * 24} x2="350" y2={230 + floor * 24} 
                          stroke="currentColor" stroke-width="1" opacity="0.3"
                          class="text-gray-400 dark:text-gray-600"/>
                  {/each}
                  
                  {#each Array(7) as _, floor}
                    <line x1="390" y1={310 + floor * 24} x2="490" y2={310 + floor * 24} 
                          stroke="currentColor" stroke-width="1" opacity="0.3"
                          class="text-gray-400 dark:text-gray-600"/>
                  {/each}
                  
                  <!-- Enhanced Professional Windows Grid -->
                  <g class="animate-fade-in" style="animation-delay: 1.2s;">
                    <!-- Main Building Windows -->
                    {#each Array(9) as _, row}
                      {#each Array(5) as _, col}
                        <rect x={215 + col * 26} y={235 + row * 24} width="18" height="20" 
                              fill="url(#techGradient)" opacity="0.8" rx="3"/>
                      {/each}
                    {/each}
                    
                    <!-- Secondary Building Windows -->
                    {#each Array(6) as _, row}
                      {#each Array(3) as _, col}
                        <rect x={395 + col * 30} y={315 + row * 24} width="16" height="18" 
                              fill="url(#constructionGradient)" opacity="0.7" rx="2"/>
                      {/each}
                    {/each}
                  </g>
                  
                  <!-- Modern Roof Structures -->
                  <polygon points="180,220 280,170 380,220" fill="url(#accentGradient)" 
                           opacity="0.9" filter="url(#glow)"/>
                  <polygon points="360,300 440,270 520,300" fill="url(#constructionGradient)" 
                           opacity="0.8"/>
                  
                  <!-- Architectural Details -->
                  <rect x="180" y="470" width="200" height="15" fill="url(#buildingGradient)" rx="7"/>
                  <rect x="185" y="455" width="190" height="15" fill="url(#accentGradient)" rx="7" opacity="0.7"/>
                  <rect x="360" y="470" width="140" height="15" fill="url(#constructionGradient)" rx="7"/>
                </g>

                <!-- Enhanced BIM Technology Elements -->
                <g class="animate-bounce-slow" style="animation-delay: 1.5s;">
                  
                  <!-- Digital Twin Representation -->
                  <rect x="80" y="200" width="100" height="150" fill="none" 
                        stroke="url(#techGradient)" stroke-width="3" stroke-dasharray="10,5" 
                        rx="8" opacity="0.9"/>
                  
                  <!-- 3D Model Layers -->
                  <rect x="90" y="215" width="80" height="12" fill="url(#techGradient)" 
                        rx="6" opacity="0.7"/>
                  <rect x="90" y="235" width="80" height="12" fill="url(#techGradient)" 
                        rx="6" opacity="0.5"/>
                  <rect x="90" y="255" width="80" height="12" fill="url(#techGradient)" 
                        rx="6" opacity="0.4"/>
                  <rect x="90" y="275" width="80" height="12" fill="url(#techGradient)" 
                        rx="6" opacity="0.3"/>
                  
                  <!-- Enhanced Data Connections -->
                  <line x1="180" y1="220" x2="200" y2="240" stroke="url(#techGradient)" 
                        stroke-width="3" opacity="0.7"/>
                  <circle cx="185" cy="225" r="4" fill="url(#accentGradient)" filter="url(#glow)"/>
                  
                  <!-- Holographic Display -->
                  <circle cx="130" cy="320" r="25" fill="none" stroke="url(#animatedGradient)" 
                          stroke-width="2" opacity="0.8"/>
                  <circle cx="130" cy="320" r="15" fill="url(#techGradient)" opacity="0.3"/>
                </g>

                <!-- Enhanced Professional Tools and Equipment -->
                <g class="animate-float" style="animation-delay: 2s;">
                  
                  <!-- Large Digital Tablet/BIM Interface -->
                  <rect x="60" y="380" width="90" height="60" fill="url(#buildingGradient)" 
                        rx="8" filter="url(#dropShadow)"/>
                  <rect x="70" y="390" width="70" height="40" fill="currentColor" 
                        class="text-blue-100 dark:text-blue-900" rx="4"/>
                  
                  <!-- Enhanced Screen Content -->
                  <line x1="80" y1="400" x2="130" y2="400" stroke="url(#techGradient)" stroke-width="2"/>
                  <line x1="80" y1="407" x2="125" y2="407" stroke="url(#techGradient)" stroke-width="2"/>
                  <line x1="80" y1="414" x2="120" y2="414" stroke="url(#techGradient)" stroke-width="2"/>
                  <line x1="80" y1="421" x2="115" y2="421" stroke="url(#techGradient)" stroke-width="2"/>
                  
                  <!-- Engineering Calculator -->
                  <rect x="480" y="420" width="60" height="45" fill="url(#accentGradient)" 
                        rx="6" opacity="0.9"/>
                  <rect x="490" y="430" width="40" height="20" fill="currentColor" 
                        class="text-white dark:text-gray-900" rx="3"/>
                  
                  <!-- Calculator Buttons -->
                  {#each Array(3) as _, row}
                    {#each Array(3) as _, col}
                      <circle cx={495 + col * 10} cy={455 + row * 8} r="3" 
                              fill="currentColor" class="text-white dark:text-gray-900" opacity="0.8"/>
                    {/each}
                  {/each}
                  
                  <!-- Surveying Equipment -->
                  <rect x="520" y="200" width="15" height="80" fill="url(#constructionGradient)" rx="3"/>
                  <circle cx="527" cy="190" r="8" fill="url(#accentGradient)"/>
                  <rect x="520" y="285" width="40" height="8" fill="url(#buildingGradient)" rx="4"/>
                </g>

                <!-- Enhanced Consulting Process Flow -->
                <g class="animate-gradient" style="animation-delay: 2.5s;">
                  
                  <!-- Process Nodes -->
                  <circle cx="150" cy="120" r="30" fill="url(#buildingGradient)" 
                          opacity="0.9" filter="url(#glow)"/>
                  <circle cx="300" cy="80" r="30" fill="url(#accentGradient)" 
                          opacity="0.9" filter="url(#glow)"/>
                  <circle cx="450" cy="120" r="30" fill="url(#techGradient)" 
                          opacity="0.9" filter="url(#glow)"/>
                  
                  <!-- Process Icons -->
                  <!-- Planning Icon -->
                  <rect x="135" y="105" width="30" height="30" fill="white" rx="4" opacity="0.9"/>
                  <line x1="145" y1="115" x2="155" y2="115" stroke="currentColor" 
                        stroke-width="2" class="text-purple-600"/>
                  <line x1="145" y1="120" x2="150" y2="120" stroke="currentColor" 
                        stroke-width="2" class="text-purple-600"/>
                  <line x1="145" y1="125" x2="155" y2="125" stroke="currentColor" 
                        stroke-width="2" class="text-purple-600"/>
                  
                  <!-- BIM Icon -->
                  <rect x="285" y="65" width="30" height="30" fill="white" rx="4" opacity="0.9"/>
                  <rect x="295" y="75" width="10" height="10" fill="none" 
                        stroke="currentColor" stroke-width="2" class="text-pink-600"/>
                  <rect x="297" y="77" width="6" height="6" fill="currentColor" class="text-pink-600" opacity="0.5"/>
                  
                  <!-- Delivery Icon -->
                  <circle cx="450" cy="120" r="15" fill="white" opacity="0.9"/>
                  <polygon points="440,115 450,105 460,115 460,125 440,125" fill="currentColor" 
                           class="text-blue-600"/>
                  
                  <!-- Enhanced Connection Flow Lines -->
                  <path d="M 180 110 Q 240 70 270 85" fill="none" stroke="url(#buildingGradient)" 
                        stroke-width="3" opacity="0.7" stroke-dasharray="8,4"/>
                  <path d="M 330 95 Q 380 75 420 105" fill="none" stroke="url(#accentGradient)" 
                        stroke-width="3" opacity="0.7" stroke-dasharray="8,4"/>
                  
                  <!-- Flow Indicators -->
                  <circle cx="225" cy="90" r="3" fill="url(#buildingGradient)">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="375" cy="90" r="3" fill="url(#accentGradient)">
                    <animate attributeName="r" values="3;6;3" dur="2s" begin="1s" repeatCount="indefinite"/>
                  </circle>
                </g>

                <!-- Enhanced Innovative Elements -->
                <g class="animate-pulse-slow" style="animation-delay: 3s;">
                  
                  <!-- Digital Innovation Symbols -->
                  
                  <circle cx="100" cy="480" r="20" fill="url(#accentGradient)" opacity="0.8"/>
                  <rect x="90" y="470" width="20" height="20" fill="white" rx="2"/>
                  <rect x="95" y="475" width="10" height="10" fill="url(#accentGradient)" rx="1"/>
                  
                  <!-- Enhanced Data Visualization Elements -->
                  <g opacity="0.6">
                    <circle cx="540" cy="250" r="3" fill="url(#techGradient)"/>
                    <circle cx="530" cy="240" r="4" fill="url(#accentGradient)"/>
                    <circle cx="535" cy="260" r="3" fill="url(#buildingGradient)"/>
                    <line x1="540" y1="250" x2="530" y2="240" stroke="url(#techGradient)" stroke-width="2"/>
                    <line x1="530" y1="240" x2="535" y2="260" stroke="url(#accentGradient)" stroke-width="2"/>
                  </g>
                  
                  <!-- Construction Progress Indicators -->
                  <rect x="60" y="100" width="15" height="40" fill="url(#constructionGradient)" opacity="0.7"/>
                  <rect x="60" y="140" width="15" height="30" fill="url(#constructionGradient)" opacity="0.5"/>
                  <rect x="60" y="170" width="15" height="20" fill="url(#constructionGradient)" opacity="0.3"/>
                </g>

                <!-- Enhanced Company Branding Elements -->
                <g class="animate-fade-in" style="animation-delay: 3.5s;">
                  <text x="300" y="560" text-anchor="middle" fill="url(#buildingGradient)" 
                        font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
                        opacity="0.7">Pioneer Consultants</text>
                  <text x="300" y="580" text-anchor="middle" fill="url(#accentGradient)" 
                        font-family="Arial, sans-serif" font-size="12" font-weight="500" 
                        opacity="0.6">Innovation • Excellence • Delivery</text>
                </g>

              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Vision Section with Enhanced Arabic Support -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="vision-trigger grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
         dir="{$locale === 'ar' ? 'rtl' : 'ltr'}">
      
      <!-- Vision Content - Enhanced RTL Support -->
      <div class="space-y-8 {$locale === 'ar' ? 'lg:order-2' : 'lg:order-1'}">
        <div class="space-y-6">
          <div class="flex items-center gap-4 {$locale === 'ar' ? 'flex-row-reverse' : ''}">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h2 class="{visionVisible ? 'animate-slide-up' : 'translate-y-4 opacity-0'} transition-all duration-1000 text-xl sm:text-2xl font-black text-black dark:text-white
                       {$locale === 'ar' ? 'font-arabic text-right' : 'text-left'}">
              {mounted ? $t('about.vision.title') : 'Our Vision'}
            </h2>
          </div>
          
          <p class="{visionVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-700 dark:text-gray-300 leading-relaxed
                    {$locale === 'ar' ? 'font-arabic text-right leading-loose' : 'text-left'}"
             style="font-size: 0.875rem; line-height: {$locale === 'ar' ? '2' : '1.7'};">
            {mounted ? $t('about.vision.description') : 'To be the most trusted and innovative construction consultancy firm in the West Midlands and beyond, setting new standards in design excellence and project delivery.'}
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-4 {$locale === 'ar' ? 'flex-row-reverse' : ''}">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
             </svg>
           </div>
           <h2 class="{visionVisible ? 'animate-slide-up' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-100 text-xl sm:text-2xl font-black text-black dark:text-white
                      {$locale === 'ar' ? 'font-arabic text-right' : 'text-left'}">
             {mounted ? $t('about.mission.title') : 'Our Mission'}
           </h2>
         </div>
         
         <p class="{visionVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-300 text-gray-700 dark:text-gray-300 leading-relaxed
                   {$locale === 'ar' ? 'font-arabic text-right leading-loose' : 'text-left'}"
            style="font-size: 0.875rem; line-height: {$locale === 'ar' ? '2' : '1.7'};">
           {mounted ? $t('about.mission.description') : 'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client. We specialize in creating innovative, sustainable structures tailored to your needs.'}
         </p>
       </div>
     </div>

     <!-- Stats Display - Enhanced RTL Support -->
     <div class="grid grid-cols-2 gap-6 {$locale === 'ar' ? 'lg:order-1' : 'lg:order-2'}">
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
           <div class="text-xs font-medium text-gray-600 dark:text-gray-400 
                       {$locale === 'ar' ? 'font-arabic' : ''}">
             {stat.label}
           </div>
         </div>
       {/each}
     </div>

   </div>
 </div>
</section>

<!-- Manager Section with Perfect Arabic Alignment -->
<section class="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
 <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
   
   <div class="manager-trigger">
     <div class="text-center mb-12">
       <h2 class="{managerVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl font-black text-black dark:text-white mb-4 
                  {$locale === 'ar' ? 'font-arabic' : ''}">
         Leadership Excellence
       </h2>
       <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
     </div>

     <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
       <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center" 
            dir="{$locale === 'ar' ? 'rtl' : 'ltr'}">
         
         <!-- Manager Image - Perfect RTL/LTR positioning -->
         <div class="text-center {$locale === 'ar' ? 'lg:order-3' : 'lg:order-1'}">
           <div class="{managerVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-200 relative">
             <div class="w-48 h-48 mx-auto mb-6 relative">
               <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-xl">
                 <svg class="w-24 h-24 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                 </svg>
               </div>
               <div class="absolute -bottom-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center
                          {$locale === 'ar' ? '-left-3' : '-right-3'}">
                 <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                 </svg>
               </div>
             </div>
           </div>
         </div>
         
         <!-- Manager Info - Perfect Arabic alignment -->
         <div class="lg:col-span-2 text-center 
                     {$locale === 'ar' ? 'lg:order-1 lg:col-span-2 lg:text-right' : 'lg:order-2 lg:text-left'}">
           <div class="{managerVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-400">
             <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white mb-2 
                        {$locale === 'ar' ? 'font-arabic' : ''}">
               Eng. Mohammed Bashir
             </h3>
             <p class="font-medium text-purple-600 dark:text-purple-400 mb-6 
                       {$locale === 'ar' ? 'font-arabic' : ''}" 
                style="font-size: 0.875rem;">
               Managing Director & Lead Consultant
             </p>
             
             <div class="space-y-4">
               <p class="text-gray-700 dark:text-gray-300 leading-relaxed
                         {$locale === 'ar' ? 'font-arabic text-right leading-loose' : 'text-left'}" 
                  style="font-size: 0.875rem; line-height: {$locale === 'ar' ? '2' : '1.7'};">
                 With extensive experience in the construction industry, Mohammed leads our vision of transforming innovative design concepts into practical realities. His expertise spans across all aspects of construction consultancy, from initial planning to project completion.
               </p>
               
               <p class="text-gray-700 dark:text-gray-300 leading-relaxed
                         {$locale === 'ar' ? 'font-arabic text-right leading-loose' : 'text-left'}" 
                  style="font-size: 0.875rem; line-height: {$locale === 'ar' ? '2' : '1.7'};">
                 Under his leadership, Pioneer Consultants has established itself as a trusted partner for clients seeking comprehensive project management, cost control, and design support across the West Midlands region.
               </p>
             </div>
             
             <!-- Skills Tags - Perfect RTL Support -->
             <div class="mt-6 flex flex-wrap gap-3 justify-center 
                         {$locale === 'ar' ? 'lg:justify-end' : 'lg:justify-start'}">
               {#each ['BIM Modeling', 'Project Management', 'Structural Design', 'Cost Control'] as skill}
                 <span class="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200/50 dark:border-purple-700/30
                             {$locale === 'ar' ? 'font-arabic' : ''}" 
                       style="font-size: 0.75rem; font-weight: 500;">
                   {skill}
                 </span>
               {/each}
             </div>
             
             <!-- Contact CTA - Perfect RTL Support -->
             <div class="mt-8">
               <a href="/contact" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform-gpu
                                         {$locale === 'ar' ? 'flex-row-reverse' : ''}" 
                  style="font-size: 0.875rem;">
                 <span class="whitespace-nowrap {$locale === 'ar' ? 'font-arabic' : ''}">
                   Connect with Leadership
                 </span>
                 <svg class="w-4 h-4 {$locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

<style>
 /* Enhanced Animation Classes */
 @keyframes float {
   0%, 100% { transform: translateY(0px) rotate(0deg); }
   50% { transform: translateY(-20px) rotate(1deg); }
 }
 
 @keyframes spin-slow {
   from { transform: rotate(0deg); }
   to { transform: rotate(360deg); }
 }
 
 @keyframes pulse-slow {
   0%, 100% { opacity: 0.3; }
   50% { opacity: 0.8; }
 }
 
 @keyframes bounce-slow {
   0%, 100% { transform: translateY(0px); }
   50% { transform: translateY(-10px); }
 }
 
 @keyframes gradient {
   0% { background-position: 0% 50%; }
   50% { background-position: 100% 50%; }
   100% { background-position: 0% 50%; }
 }
 
 @keyframes slide-up {
   from { 
     opacity: 0; 
     transform: translateY(30px); 
   }
   to { 
     opacity: 1; 
     transform: translateY(0px); 
   }
 }
 
 @keyframes fade-in {
   from { opacity: 0; }
   to { opacity: 1; }
 }
 
 @keyframes scale-in {
   from { 
     opacity: 0; 
     transform: scale(0.8); 
   }
   to { 
     opacity: 1; 
     transform: scale(1); 
   }
 }

 /* Animation Classes */
 .animate-float {
   animation: float 6s ease-in-out infinite;
 }
 
 .animate-spin-slow {
   animation: spin-slow 20s linear infinite;
 }
 
 .animate-pulse-slow {
   animation: pulse-slow 4s ease-in-out infinite;
 }
 
 .animate-bounce-slow {
   animation: bounce-slow 3s ease-in-out infinite;
 }
 
 .animate-gradient {
   animation: gradient 8s ease infinite;
   background-size: 200% 200%;
 }
 
 .animate-slide-up {
   animation: slide-up 1s ease-out;
 }
 
 .animate-fade-in {
   animation: fade-in 1s ease-out;
 }
 
 .animate-scale-in {
   animation: scale-in 1s ease-out;
 }

 /* Enhanced Arabic Typography Support */
 .font-arabic {
   font-family: 'Tajawal', 'Amiri', 'Cairo', 'Noto Sans Arabic', 'Arial', sans-serif;
   letter-spacing: normal;
   word-spacing: 0.1em;
 }
 
 /* Enhanced Leading for Arabic */
 .leading-loose {
   line-height: 2 !important;
 }
 
 /* Perfect RTL Text Alignment */
 [dir="rtl"] .text-right {
   text-align: right !important;
 }
 
 [dir="rtl"] .lg\:text-right {
   text-align: right !important;
 }
 
 /* RTL Flex Direction Support */
 [dir="rtl"] .flex-row-reverse {
   flex-direction: row-reverse !important;
 }
 
 /* Enhanced Responsive Design */
 @media (max-width: 768px) {
   .hero-trigger .grid {
     gap: 2rem;
   }
   
   .hero-trigger h1 {
     font-size: clamp(2rem, 6vw, 3rem) !important;
   }
   
   /* Mobile Arabic adjustments */
   [dir="rtl"] .text-center {
     text-align: center;
   }
 }
 
 @media (min-width: 1024px) {
   /* Large screen Arabic adjustments */
   [dir="rtl"] .lg\:justify-end {
     justify-content: flex-end !important;
   }
   
   [dir="rtl"] .lg\:justify-start {
     justify-content: flex-start !important;
   }
 }
 
 /* Dark Mode Improvements */
 @media (prefers-color-scheme: dark) {
   .animate-gradient {
     filter: brightness(0.8);
   }
 }
 
 /* Accessibility Improvements */
 @media (prefers-reduced-motion: reduce) {
   .animate-float,
   .animate-spin-slow,
   .animate-pulse-slow,
   .animate-bounce-slow,
   .animate-gradient,
   .animate-slide-up,
   .animate-fade-in,
   .animate-scale-in {
     animation: none;
   }
 }
 
 /* Enhanced Focus States for Accessibility */
 a:focus-visible {
   outline: 2px solid #8B5CF6;
   outline-offset: 2px;
   border-radius: 4px;
 }
 
 /* SVG Responsive Scaling */
 @media (max-width: 640px) {
   .hero-trigger svg {
     width: 24rem !important;
     height: 24rem !important;
   }
 }
 
 @media (min-width: 641px) and (max-width: 1023px) {
   .hero-trigger svg {
     width: 28rem !important;
     height: 28rem !important;
   }
 }
 
 @media (min-width: 1024px) {
   .hero-trigger svg {
     width: 36rem !important;
     height: 36rem !important;
   }
 }
 
 /* Print Styles */
 @media print {
   .animate-float,
   .animate-spin-slow,
   .animate-pulse-slow,
   .animate-bounce-slow,
   .animate-gradient {
     animation: none;
   }
   
   .bg-gradient-to-br,
   .bg-gradient-to-r {
     background: #f8f9fa !important;
     -webkit-print-color-adjust: exact;
   }
 }
</style>

