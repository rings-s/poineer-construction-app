<!-- src/lib/components/Navigation.svelte -->
<script>
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  import { page } from '$app/stores';
  
  // Navigation state
  let isOpen = false;
  let isScrolled = false;
  let mounted = false;
  
  // Mobile menu animation states
  let mobileMenuVisible = false;
  let menuItemsVisible = false;
  
  // Navigation items with enhanced data
  const navItems = [
    { 
      href: '/', 
      key: 'nav.home', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      description: 'Main page'
    },
    { 
      href: '/about', 
      key: 'nav.about', 
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'About us'
    },
    { 
      href: '/services', 
      key: 'nav.services', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      description: 'Our services'
    },
    { 
      href: '/contact', 
      key: 'nav.contact', 
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      description: 'Get in touch'
    }
  ];

  // Mobile menu management with enhanced animations
  function toggleMobileMenu() {
    if (!isOpen) {
      // Opening sequence
      isOpen = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        mobileMenuVisible = true;
        setTimeout(() => {
          menuItemsVisible = true;
        }, 200);
      }, 50);
    } else {
      // Closing sequence
      menuItemsVisible = false;
      setTimeout(() => {
        mobileMenuVisible = false;
        setTimeout(() => {
          isOpen = false;
          document.body.style.overflow = '';
        }, 300);
      }, 100);
    }
  }

  function closeMobileMenu() {
    menuItemsVisible = false;
    setTimeout(() => {
      mobileMenuVisible = false;
      setTimeout(() => {
        isOpen = false;
        document.body.style.overflow = '';
      }, 300);
    }, 100);
  }

  // Scroll detection
  function handleScroll() {
    if (typeof window !== 'undefined') {
      isScrolled = window.scrollY > 20;
    }
  }

  // Check if route is active
  function isActiveRoute(href) {
    if (!mounted) return false;
    return $page.url.pathname === href;
  }

  // Handle click outside to close menu
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.mobile-menu-content')) {
      closeMobileMenu();
    }
  }

  onMount(() => {
    mounted = true;
    locale.init();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu on route change
    const unsubscribe = page.subscribe(() => {
      if (isOpen) {
        closeMobileMenu();
      }
    });

    // Handle escape key
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        closeMobileMenu();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      unsubscribe();
      document.body.style.overflow = '';
    };
  });
</script>

<!-- Navigation Container -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {
  isScrolled 
    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-lg border-b border-gray-200/30 dark:border-gray-700/30' 
    : 'bg-transparent'
}" aria-label="Main navigation">
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-18">
      
      <!-- Logo Section -->
      <div class="flex items-center" class:flex-row-reverse={$locale === 'ar'}>
        <a href="/" class="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 rounded-2xl p-2 transition-all duration-300" class:space-x-reverse={$locale === 'ar'} aria-label="Pioneer Consultants Home">
          
          <!-- Minimal Logo Icon -->
          <div class="relative">
            <div class="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <svg class="w-5 h-5 lg:w-6 lg:h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
          </div>
          
          <!-- Logo Text -->
          <div class="hidden sm:block">
            <div class="text-lg lg:text-xl font-black leading-tight {
              isScrolled 
                ? 'text-gray-900 dark:text-white' 
                : 'text-white'
            } transition-colors duration-300" class:font-arabic={$locale === 'ar'}>
              Pioneer
            </div>
            <div class="text-xs font-medium {
              isScrolled 
                ? 'text-gray-600 dark:text-gray-400' 
                : 'text-white/70'
            } transition-colors duration-300 -mt-0.5" class:font-arabic={$locale === 'ar'}>
              Consultants
            </div>
          </div>
        </a>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="hidden lg:flex items-center space-x-1" class:space-x-reverse={$locale === 'ar'}>
        {#each navItems as item}
          <a 
            href={item.href}
            class="group relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 {
              isActiveRoute(item.href)
                ? isScrolled
                  ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30'
                  : 'text-purple-200 bg-white/15'
                : isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
            }"
            class:font-arabic={$locale === 'ar'}
            aria-current={isActiveRoute(item.href) ? 'page' : undefined}
          >
            <span class="relative z-10 flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'}>
              <svg class="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d={item.icon}/>
              </svg>
              <span>{mounted ? $t(item.key) : ''}</span>
            </span>
            
            <!-- Active indicator -->
            {#if isActiveRoute(item.href)}
              <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Controls Section -->
      <div class="flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'}>
        
        <!-- Language Toggle -->
        <button
          on:click={locale.toggle}
          class="p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 group {
            isScrolled 
              ? 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }"
          aria-label="Change language"
        >
          <div class="flex items-center space-x-1 text-xs font-bold">
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <span class="transition-all duration-300 group-hover:scale-105">{$locale.toUpperCase()}</span>
          </div>
        </button>

        <!-- CTA Button - Desktop -->
        <a
          href="/contact"
          class="hidden lg:inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
          class:space-x-reverse={$locale === 'ar'}
          class:font-arabic={$locale === 'ar'}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>{mounted ? $t('nav.contact') : 'Contact'}</span>
        </a>

        <!-- Advanced Mobile Menu Button -->
        <button
          on:click={toggleMobileMenu}
          class="lg:hidden relative p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 {
            isScrolled 
              ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
              : 'text-white hover:text-white/80 hover:bg-white/10'
          }"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div class="w-6 h-6 relative flex items-center justify-center">
            <!-- Top line -->
            <span class="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-out {
              isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }"></span>
            <!-- Middle line -->
            <span class="absolute w-5 h-0.5 bg-current transition-all duration-300 ease-out {
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }"></span>
            <!-- Bottom line -->
            <span class="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-out {
              isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }"></span>
          </div>
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- Enhanced Mobile Menu Overlay -->
{#if isOpen}
  <div 
    class="fixed inset-0 z-40 lg:hidden"
    role="dialog" 
    aria-modal="true"
    aria-label="Mobile navigation menu"
    tabindex="0"
    on:click={handleClickOutside}
    on:keydown={(e) => e.key === 'Escape' && closeMenu()}
  >
    <!-- Backdrop with blur -->
    <div 
      class="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-400 {
        mobileMenuVisible ? 'opacity-100' : 'opacity-0'
      }"
    ></div>
    
    <!-- Mobile Menu Content -->
    <div class="mobile-menu-content absolute inset-x-4 top-20 bottom-4 max-w-sm mx-auto">
      <div class="relative h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transform transition-all duration-400 {
        mobileMenuVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }">
        
        <!-- Menu Header -->
        <div class="px-6 py-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div class="flex items-center space-x-3" class:space-x-reverse={$locale === 'ar'}>
            <div class="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <div class="font-bold text-gray-900 dark:text-white text-sm" class:font-arabic={$locale === 'ar'}>Pioneer Consultants</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 -mt-0.5" class:font-arabic={$locale === 'ar'}>Building the future</div>
            </div>
          </div>
        </div>

        <!-- Navigation Items -->
        <div class="px-4 py-6 space-y-2">
          {#each navItems as item, index}
            <a
              href={item.href}
              class="group flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 {
                isActiveRoute(item.href)
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-purple-600 dark:hover:text-purple-400'
              } {
                menuItemsVisible ? 'translate-x-0 opacity-100' : ($locale === 'ar' ? 'translate-x-8' : '-translate-x-8') + ' opacity-0'
              }"
              class:space-x-reverse={$locale === 'ar'}
              class:font-arabic={$locale === 'ar'}
              style="transition-delay: {index * 80}ms"
              on:click={closeMobileMenu}
            >
              <!-- Icon Container -->
              <div class="relative">
                <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-105 {
                  isActiveRoute(item.href) ? 'bg-purple-100 dark:bg-purple-900/40' : 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20'
                }">
                  <svg class="w-5 h-5 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d={item.icon}/>
                  </svg>
                </div>
                
                <!-- Active indicator -->
                {#if isActiveRoute(item.href)}
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                {/if}
              </div>
              
              <!-- Text Content -->
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-base leading-tight">{mounted ? $t(item.key) : ''}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
              </div>
              
              <!-- Arrow -->
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={$locale === 'ar' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}/>
                </svg>
              </div>
            </a>
          {/each}
        </div>

        <!-- Menu Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-50/80 to-transparent dark:from-gray-800/80 dark:to-transparent backdrop-blur-sm">
          <a
            href="/contact"
            class="w-full flex items-center justify-center space-x-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform {
              menuItemsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }"
            class:space-x-reverse={$locale === 'ar'}
            class:font-arabic={$locale === 'ar'}
            style="transition-delay: 400ms"
            on:click={closeMobileMenu}
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span>{mounted ? $t('nav.contact') : 'Start Your Project'}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
  }

  /* Enhanced mobile menu animations */
  .mobile-menu-content a {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
    
    .mobile-menu-content a {
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
    }
  }

  /* Focus visible enhancement */
  @supports selector(:focus-visible) {
    button:focus,
    a:focus {
      outline: none;
    }
    
    button:focus-visible,
    a:focus-visible {
      outline: 2px solid rgb(147 51 234 / 0.5);
      outline-offset: 2px;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    .mobile-menu-content {
      border: 2px solid currentColor;
    }
    
    nav a,
    nav button {
      border: 1px solid transparent;
    }
    
    nav a:hover,
    nav button:hover {
      border-color: currentColor;
    }
  }
</style>