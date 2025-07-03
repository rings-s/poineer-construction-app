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

<!-- About Hero Section -->
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
          <div class="{heroVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 flex justify-center sm:justify-start
                      {$locale === 'ar' ? 'sm:justify-end' : ''}">
            <div class="relative">
              <svg class="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="aboutBuildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                  </linearGradient>
                  
                  <linearGradient id="aboutAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
                  </linearGradient>
                  
                  <linearGradient id="aboutTeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
                  </linearGradient>

                  <filter id="aboutGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <!-- Background Circle -->
                <circle cx="60" cy="60" r="55" fill="url(#aboutBuildingGradient)" opacity="0.1"/>
                
                <!-- Building Structure -->
                <g filter="url(#aboutGlow)">
                  <!-- Main Building -->
                  <rect x="35" y="40" width="20" height="35" fill="url(#aboutBuildingGradient)" rx="2"/>
                  <rect x="65" y="35" width="20" height="40" fill="url(#aboutAccentGradient)" rx="2"/>
                  
                  <!-- Windows -->
                  <rect x="38" y="45" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="45" y="45" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="38" y="55" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="45" y="55" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  
                  <rect x="68" y="40" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="75" y="40" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="68" y="50" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="75" y="50" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="68" y="60" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                  <rect x="75" y="60" width="4" height="4" fill="white" opacity="0.8" rx="1"/>
                </g>

                <!-- Team Icons -->
                <g class="animate-pulse-slow">
                  <circle cx="25" cy="30" r="6" fill="url(#aboutTeamGradient)" opacity="0.8"/>
                  <circle cx="95" cy="30" r="6" fill="url(#aboutTeamGradient)" opacity="0.8"/>
                  <circle cx="25" cy="90" r="6" fill="url(#aboutTeamGradient)" opacity="0.8"/>
                  <circle cx="95" cy="90" r="6" fill="url(#aboutTeamGradient)" opacity="0.8"/>
                  
                  <!-- People Icons -->
                  <path d="M22 27 a3 3 0 0 1 6 0 M22 33 a6 6 0 0 1 12 0" stroke="white" stroke-width="1" fill="none" opacity="0.9"/>
                  <path d="M92 27 a3 3 0 0 1 6 0 M92 33 a6 6 0 0 1 12 0" stroke="white" stroke-width="1" fill="none" opacity="0.9"/>
                  <path d="M22 87 a3 3 0 0 1 6 0 M22 93 a6 6 0 0 1 12 0" stroke="white" stroke-width="1" fill="none" opacity="0.9"/>
                  <path d="M92 87 a3 3 0 0 1 6 0 M92 93 a6 6 0 0 1 12 0" stroke="white" stroke-width="1" fill="none" opacity="0.9"/>
                </g>

                <!-- Central Connection Lines -->
                <g opacity="0.6">
                  <line x1="25" y1="30" x2="60" y2="60" stroke="url(#aboutTeamGradient)" stroke-width="1"/>
                  <line x1="95" y1="30" x2="60" y2="60" stroke="url(#aboutTeamGradient)" stroke-width="1"/>
                  <line x1="25" y1="90" x2="60" y2="60" stroke="url(#aboutTeamGradient)" stroke-width="1"/>
                  <line x1="95" y1="90" x2="60" y2="60" stroke="url(#aboutTeamGradient)" stroke-width="1"/>
                </g>

              </svg>
            </div>
          </div>

          <h1 class="{heroVisible ? 'animate-slide-up' : 'translate-y-8 opacity-0'} transition-all duration-1000 delay-200 font-black text-black dark:text-white leading-[0.9]" 
              style="font-size: clamp(2.5rem, 7vw, 4rem);" 
              class:font-arabic={$locale === 'ar'}
              lang="{$locale}">
            <span class="block mb-2">
              {$locale === 'ar' ? 'من نحن' : 'About Us'}
            </span>
          </h1>
          
          <p class="{heroVisible ? 'animate-fade-in' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-400 text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-3xl
                     {$locale === 'ar' ? 'text-right leading-loose font-arabic mx-auto sm:ml-auto' : 'text-left'}"
             style="font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: {$locale === 'ar' ? '2' : '1.7'};"
             lang="{$locale}">
            {$locale === 'ar' ? 
              'بايونير كونسلتنتس تجمع بين الرؤية الإبداعية والجدوى العملية. كشركة ناشئة مبتكرة، نحن متخصصون في إدارة المشاريع الشاملة، والتحكم في التكلفة، ودعم التصميم عبر منطقة ويست ميدلاندز.' :
              'Pioneer Consultants combines creative vision with viability. As an innovative startup, we specialize in comprehensive project management, cost control, and design support across the West Midlands.'
            }
          </p>

          <!-- Key Stats -->
          <div class="{heroVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-600 flex flex-wrap gap-4 justify-center
                      {$locale === 'ar' ? 'sm:justify-end' : 'sm:justify-start'}">
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">
                {$locale === 'ar' ? 'رؤية إبداعية' : 'Creative Vision'}
              </span>
            </div>
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">
                {$locale === 'ar' ? 'فريق خبير' : 'Expert Team'}
              </span>
            </div>
            <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30
                        {$locale === 'ar' ? 'flex-row-reverse' : ''}">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 {$locale === 'ar' ? 'font-arabic' : ''}">
                {$locale === 'ar' ? 'ويست ميدلاندز' : 'West Midlands'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Vision & Mission Section -->
<section class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="vision-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{visionVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
          {$locale === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Vision & Mission'}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
        <p class="{visionVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto" 
           style="font-size: 0.875rem; line-height: 1.7;"
           class:font-arabic={$locale === 'ar'} 
           class:leading-loose={$locale === 'ar'}>
          {$locale === 'ar' ? 'بناء مستقبل الاستشارات الإنشائية' : 'Building the future of construction consultancy'}
        </p>
      </div>
      
      <!-- Vision & Mission Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        <!-- Vision Card -->
        <div class="{visionVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-700/30">
          <div class="w-14 h-14 bg-purple-600 dark:bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
            {$locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed"
             style="font-size: 0.875rem; line-height: 1.7;"
             class:font-arabic={$locale === 'ar'} 
             class:text-right={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'}>
            {$locale === 'ar' ? 
              'أن نكون أكثر شركات الاستشارات الإنشائية ثقة وابتكاراً في ويست ميدلاندز وما بعدها، مع وضع معايير جديدة في التميز في التصميم وتسليم المشاريع.' :
              'To be the most trusted and innovative construction consultancy firm in the West Midlands and beyond, setting new standards in design excellence and project delivery.'
            }
          </p>
        </div>

        <!-- Mission Card -->
        <div class="{visionVisible ? 'animate-scale-in' : 'scale-0 opacity-0'} transition-all duration-1000 delay-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/30">
          <div class="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
            {$locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed"
             style="font-size: 0.875rem; line-height: 1.7;"
             class:font-arabic={$locale === 'ar'} 
             class:text-right={$locale === 'ar'}
             class:leading-loose={$locale === 'ar'}>
            {$locale === 'ar' ? 
              'يجمع فريقنا بين الخبرة المهنية في التصميم والالتزام بتقديم حلول عملية وملهمة لكل عميل. نحن متخصصون في إنشاء هياكل مبتكرة ومستدامة مصممة خصيصاً لاحتياجاتكم.' :
              'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client. We specialize in creating innovative, sustainable structures tailored to your needs.'
            }
          </p>
        </div>

      </div>

    </div>
  </div>
</section>
 
 <!-- Manager Section - Enhanced -->
 <section class="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
    <div class="manager-trigger">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="{managerVisible ? 'animate-slide-up' : 'translate-y-6 opacity-0'} transition-all duration-1000 text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white mb-6" class:font-arabic={$locale === 'ar'}>
          {$locale === 'ar' ? 'التميز القيادي' : 'Leadership Excellence'}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
        <p class="{managerVisible ? 'animate-fade-in' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-200 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto" 
           style="font-size: 0.875rem; line-height: 1.7;"
           class:font-arabic={$locale === 'ar'} 
           class:leading-loose={$locale === 'ar'}>
          {$locale === 'ar' ? 
            'تعرف على القائد الرؤوي الذي يقود الابتكار في الاستشارات الإنشائية' :
            'Meet the visionary leader driving innovation in construction consultancy'
          }
        </p>
      </div>
 
      <div class="{managerVisible ? 'animate-scale-in' : 'scale-95 opacity-0'} transition-all duration-1000 delay-400 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center" 
             dir="{$locale === 'ar' ? 'rtl' : 'ltr'}">
          
          <!-- Manager Image -->
          <div class="text-center {$locale === 'ar' ? 'lg:order-3' : 'lg:order-1'}">
            <div class="relative">
              <div class="w-48 h-48 mx-auto mb-6 relative">
                <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-lg">
                  <svg class="w-24 h-24 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="absolute -bottom-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg
                           {$locale === 'ar' ? '-left-3' : '-right-3'}">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Manager Info -->
          <div class="lg:col-span-2 text-center sm:text-left
                      {$locale === 'ar' ? 'lg:order-1 lg:col-span-2 sm:text-right lg:text-right' : 'lg:order-2 lg:text-left'}">
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="text-lg sm:text-xl font-black text-black dark:text-white {$locale === 'ar' ? 'font-arabic' : ''}">
                  {$locale === 'ar' ? 'م. محمد بشير' : 'Eng. Mohammed Bashir'}
                </h3>
                <p class="text-sm font-medium text-purple-600 dark:text-purple-400 {$locale === 'ar' ? 'font-arabic' : ''}">
                  {$locale === 'ar' ? 'المدير العام والاستشاري الرئيسي' : 'Managing Director & Lead Consultant'}
                </p>
              </div>
              
              <div class="space-y-4">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed"
                   style="font-size: 0.875rem; line-height: 1.7;"
                   class:font-arabic={$locale === 'ar'} 
                   class:text-right={$locale === 'ar'}
                   class:leading-loose={$locale === 'ar'}>
                  {$locale === 'ar' ? 
                    'بخبرة واسعة في صناعة البناء، يقود محمد رؤيتنا في تحويل مفاهيم التصميم المبتكرة إلى حقائق عملية. خبرته تمتد عبر جميع جوانب الاستشارات الإنشائية، من التخطيط الأولي إلى إنجاز المشروع.' :
                    'With extensive experience in the construction industry, Mohammed leads our vision of transforming innovative design concepts into practical realities. His expertise spans across all aspects of construction consultancy, from initial planning to project completion.'
                  }
                </p>
                
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed"
                   style="font-size: 0.875rem; line-height: 1.7;"
                   class:font-arabic={$locale === 'ar'} 
                   class:text-right={$locale === 'ar'}
                   class:leading-loose={$locale === 'ar'}>
                  {$locale === 'ar' ? 
                    'تحت قيادته، أسست بايونير كونسلتنتس نفسها كشريك موثوق للعملاء الذين يسعون لإدارة المشاريع الشاملة، والتحكم في التكاليف، ودعم التصميم عبر منطقة ويست ميدلاندز.' :
                    'Under his leadership, Pioneer Consultants has established itself as a trusted partner for clients seeking comprehensive project management, cost control, and design support across the West Midlands region.'
                  }
                </p>
              </div>
              
              <!-- Skills Tags -->
              <div class="flex flex-wrap gap-2 justify-center sm:justify-start
                          {$locale === 'ar' ? 'sm:justify-end' : ''}">
                {#each ($locale === 'ar' ? ['نمذجة BIM', 'إدارة المشاريع', 'التصميم الهيكلي', 'التحكم في التكلفة'] : ['BIM Modeling', 'Project Management', 'Structural Design', 'Cost Control']) as skill}
                  <span class="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200/50 dark:border-purple-700/30 text-xs font-medium
                              {$locale === 'ar' ? 'font-arabic' : ''}">
                    {skill}
                  </span>
                {/each}
              </div>
              
              <!-- Contact CTA -->
             <div class="pt-6">
              <a href="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform-gpu shadow-lg
                                        {$locale === 'ar' ? 'flex-row-reverse' : ''}" 
                 style="font-size: clamp(0.875rem, 2vw, 1.125rem);">
                <span class="whitespace-nowrap {$locale === 'ar' ? 'font-arabic' : ''}">
                  {$locale === 'ar' ? 'تواصل مع القيادة' : 'Connect with Leadership'}
                </span>
                <svg class="w-5 h-5 {$locale === 'ar' ? 'mr-3 rotate-180' : 'ml-3'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }

  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .leading-loose {
    line-height: 2.2 !important;
  }

  .grid-cols-16 {
    grid-template-columns: repeat(16, minmax(0, 1fr));
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-float-gentle,
    .animate-pulse-soft,
    .animate-slide-up,
    .animate-fade-in,
    .animate-scale-in,
    .animate-pulse-slow {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
</style>