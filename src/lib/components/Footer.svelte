<!-- src/lib/components/Footer.svelte -->
<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  
  let mounted = false;
  let currentYear = new Date().getFullYear();
  
  // Footer sections data
  const footerSections = {
    company: {
      title: 'footer.company',
      links: [
        { key: 'footer.links.about', href: '/about' },
        { key: 'nav.services', href: '/services' },
        { key: 'footer.links.contact', href: '/contact' }
      ]
    },
    services: {
      title: 'footer.services',
      links: [
        { key: 'services.projectTypes.bim', href: '/services#bim' },
        { key: 'services.projectTypes.structural', href: '/services#structural' },
        { key: 'services.projectTypes.interior', href: '/services#interior' },
        { key: 'services.projectTypes.visualization', href: '/services#visualization' }
      ]
    },
    legal: {
      title: 'footer.legal',
      links: [
        { key: 'footer.links.privacy', href: '/privacy' },
        { key: 'footer.links.terms', href: '/terms' },
        { key: 'footer.links.sitemap', href: '/sitemap' }
      ]
    }
  };

  // Social media links
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
    },
    {
      name: 'Facebook',
      href: '#',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.625-2.062-4.625-4.624C7.375 9.437 9.437 7.376 12 7.376s4.625 2.061 4.625 4.624C16.625 14.562 14.563 16.624 12 16.624zM17.965 6.584c-.6 0-1.086-.486-1.086-1.086s.486-1.085 1.086-1.085 1.085.485 1.085 1.085-.485 1.086-1.085 1.086z'
    }
  ];

  // Contact information
  const contactInfo = {
    email: 'info@pioneerconsultants.com',
    phone: '+44 (0) 123 456 7890',
    address: 'West Midlands, United Kingdom'
  };

  onMount(() => {
    mounted = true;
    locale.init();
  });
</script>

<!-- Footer Container -->
<footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
  
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-pattern)"/>
    </svg>
  </div>

  <!-- Main Footer Content -->
  <div class="relative z-10">
    
    <!-- Top Section -->
    <div class="px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <div class="max-w-7xl mx-auto">
        
        <!-- Brand Section -->
        <div class="text-center mb-16">
          <div class="flex items-center justify-center space-x-4 mb-6" class:space-x-reverse={$locale === 'ar'}>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div class="text-left" class:text-right={$locale === 'ar'}>
              <h2 class="text-3xl font-black text-white leading-tight" class:font-arabic={$locale === 'ar'}>
                Pioneer Consultants
              </h2>
              <p class="text-purple-300 font-medium text-sm -mt-1" class:font-arabic={$locale === 'ar'}>
                Building the Future
              </p>
            </div>
          </div>
          
          <p class="text-gray-300 text-lg font-medium leading-relaxed max-w-2xl mx-auto" class:font-arabic={$locale === 'ar'}>
            {mounted ? $t('footer.description') : 'Bringing Vision to Reality through innovative construction consultancy and design services across the West Midlands.'}
          </p>
        </div>

        <!-- Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          <!-- Company Links -->
          <div class="space-y-6">
            <h3 class="text-white font-bold text-lg flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'} class:font-arabic={$locale === 'ar'}>
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>{mounted ? $t(footerSections.company.title) : 'Company'}</span>
            </h3>
            <nav class="space-y-3">
              {#each footerSections.company.links as link}
                <a 
                  href={link.href} 
                  class="block text-gray-300 hover:text-purple-300 transition-colors duration-300 font-medium group"
                  class:font-arabic={$locale === 'ar'}
                >
                  <span class="relative">
                    {mounted ? $t(link.key) : ''}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              {/each}
            </nav>
          </div>

          <!-- Services Links -->
          <div class="space-y-6">
            <h3 class="text-white font-bold text-lg flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'} class:font-arabic={$locale === 'ar'}>
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M17.657 17.657l-.707-.707M12 21v-1m-6.364.636l.707-.707M3 12h1m2.343-5.657l.707.707"/>
              </svg>
              <span>{mounted ? $t(footerSections.services.title) : 'Services'}</span>
            </h3>
            <nav class="space-y-3">
              {#each footerSections.services.links as link}
                <a 
                  href={link.href} 
                  class="block text-gray-300 hover:text-blue-300 transition-colors duration-300 font-medium group"
                  class:font-arabic={$locale === 'ar'}
                >
                  <span class="relative">
                    {mounted ? $t(link.key) : ''}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              {/each}
            </nav>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <h3 class="text-white font-bold text-lg flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'} class:font-arabic={$locale === 'ar'}>
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{mounted ? $t('footer.contact') : 'Contact'}</span>
            </h3>
            <div class="space-y-4">
              <a 
                href={`mailto:${contactInfo.email}`} 
                class="flex items-center space-x-3 text-gray-300 hover:text-emerald-300 transition-colors duration-300 group"
                class:space-x-reverse={$locale === 'ar'}
              >
                <svg class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
                <span class="font-medium break-all">{contactInfo.email}</span>
              </a>
              
              <a 
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
                class="flex items-center space-x-3 text-gray-300 hover:text-emerald-300 transition-colors duration-300 group"
                class:space-x-reverse={$locale === 'ar'}
              >
                <svg class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span class="font-medium">{contactInfo.phone}</span>
              </a>
              
              <div class="flex items-start space-x-3 text-gray-300" class:space-x-reverse={$locale === 'ar'}>
                <svg class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="font-medium leading-relaxed">{contactInfo.address}</span>
              </div>
            </div>
          </div>

          <!-- Legal & Social -->
          <div class="space-y-6">
            <h3 class="text-white font-bold text-lg flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'} class:font-arabic={$locale === 'ar'}>
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>{mounted ? $t(footerSections.legal.title) : 'Legal'}</span>
            </h3>
            
            <!-- Legal Links -->
            <nav class="space-y-3 mb-6">
              {#each footerSections.legal.links as link}
                <a 
                  href={link.href} 
                  class="block text-gray-300 hover:text-amber-300 transition-colors duration-300 font-medium group"
                  class:font-arabic={$locale === 'ar'}
                >
                  <span class="relative">
                    {mounted ? $t(link.key) : ''}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              {/each}
            </nav>
            
            <!-- Social Links -->
            <div>
              <h4 class="text-white font-semibold text-sm mb-3 flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'} class:font-arabic={$locale === 'ar'}>
                <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>{mounted ? $t('footer.social') : 'Follow Us'}</span>
              </h4>
              <div class="flex items-center space-x-4" class:space-x-reverse={$locale === 'ar'}>
                {#each socialLinks as social}
                  <a 
                    href={social.href} 
                    class="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label={social.name}
                  >
                    <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="border-t border-gray-700/50">
      <div class="px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-7xl mx-auto">
          
          <!-- Bottom Content -->
          <div class="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            <!-- Copyright -->
            <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left" class:sm:space-x-reverse={$locale === 'ar'} class:sm:text-right={$locale === 'ar'}>
              <p class="text-gray-400 text-sm font-medium" class:font-arabic={$locale === 'ar'}>
                © {currentYear} Pioneer Consultants. {mounted ? $t('footer.rights') : 'All rights reserved.'}
              </p>
              <span class="hidden sm:block text-gray-600">•</span>
              <p class="text-gray-500 text-xs" class:font-arabic={$locale === 'ar'}>
                Made in the West Midlands, UK
              </p>
            </div>
            
            <!-- Developer Credit -->
            <div class="flex items-center space-x-3 text-gray-400 text-sm" class:space-x-reverse={$locale === 'ar'}>
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <span class="font-medium">
                Developed by 
                <a 
                  href="https://github.com/ahmed-bashir-ali" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold ml-1"
                >
                  Ahmed Bashir Ali
                </a>
              </span>
            </div>
            
            <!-- Language Toggle -->
            <button
              on:click={locale.toggle}
              class="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 text-gray-300 hover:text-white font-medium group"
              class:space-x-reverse={$locale === 'ar'}
              aria-label="Change language"
            >
              <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span class="text-xs font-bold">{$locale.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
  }

  /* Enhanced hover effects */
  footer a:hover svg {
    transform: scale(1.1);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Smooth underline animations */
  .group:hover span span {
    width: 100%;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
    
    footer a:hover svg {
      transform: none !important;
    }
  }

  /* Focus visible enhancement */
  @supports selector(:focus-visible) {
    a:focus,
    button:focus {
      outline: none;
    }
    
    a:focus-visible,
    button:focus-visible {
      outline: 2px solid rgb(147 51 234 / 0.7);
      outline-offset: 2px;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    footer {
      border: 2px solid white;
    }
    
    footer a,
    footer button {
      border: 1px solid transparent;
    }
    
    footer a:hover,
    footer button:hover {
      border-color: currentColor;
    }
  }
</style>