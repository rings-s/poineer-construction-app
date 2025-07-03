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

  // Scroll detection - Show navbar by default, hide when scrolling
  function handleScroll() {
    if (typeof window !== 'undefined') {
      isScrolled = window.scrollY > 100; // Hide after scrolling 100px
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

<!-- Advanced Navigation Container -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out {
  isScrolled 
    ? 'nav-hidden' 
    : 'nav-visible'
}" aria-label="Main navigation">
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-18">
      
      <!-- Logo Section -->
      <div class="flex items-center" class:flex-row-reverse={$locale === 'ar'}>
        <a href="/" class="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 rounded-2xl p-2 transition-all duration-300" class:space-x-reverse={$locale === 'ar'} aria-label="Pioneer Consultants Home">
          
          <!-- Advanced Logo Icon -->
          <div class="relative">
            <div class="logo-container transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
              <div class="logo-glow"></div>
              <svg class="logo-icon transition-all duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
          </div>
          
          <!-- Advanced Logo Text -->
          <div class="hidden sm:block">
            <div class="logo-text-primary transition-all duration-500" class:font-arabic={$locale === 'ar'}>
              Pioneer
            </div>
            <div class="logo-text-secondary transition-all duration-500" class:font-arabic={$locale === 'ar'}>
              Consultants
            </div>
          </div>
        </a>
      </div>

      <!-- Advanced Desktop Navigation Links -->
      <div class="hidden lg:flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'}>
        {#each navItems as item}
          <a 
            href={item.href}
            class="nav-link {isActiveRoute(item.href) ? 'nav-link-active' : ''}"
            class:font-arabic={$locale === 'ar'}
            aria-current={isActiveRoute(item.href) ? 'page' : undefined}
          >
            <span class="nav-link-content">
              <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d={item.icon}/>
              </svg>
              <span class="nav-link-text">{mounted ? $t(item.key) : ''}</span>
            </span>
            
            <!-- Enhanced Active indicator -->
            {#if isActiveRoute(item.href)}
              <div class="nav-link-indicator"></div>
            {/if}
            
            <!-- Hover effect background -->
            <div class="nav-link-bg"></div>
          </a>
        {/each}
      </div>

      <!-- Controls Section -->
      <div class="flex items-center space-x-2" class:space-x-reverse={$locale === 'ar'}>
        
        <!-- Advanced Language Toggle -->
        <button
          on:click={locale.toggle}
          class="nav-control-btn"
          aria-label="Change language"
        >
          <div class="nav-control-content">
            <svg class="nav-control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <span class="nav-control-text">{$locale.toUpperCase()}</span>
          </div>
        </button>

        <!-- Advanced CTA Button - Desktop -->
        <a
          href="/contact"
          class="hidden lg:inline-flex nav-cta-btn"
          class:space-x-reverse={$locale === 'ar'}
          class:font-arabic={$locale === 'ar'}
        >
          <svg class="nav-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span class="nav-cta-text">{mounted ? $t('nav.contact') : 'Contact'}</span>
        </a>

        <!-- Advanced Mobile Menu Button -->
        <button
          on:click={toggleMobileMenu}
          class="lg:hidden nav-mobile-btn {isOpen ? 'nav-mobile-btn-open' : ''}"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div class="nav-mobile-hamburger">
            <!-- Top line -->
            <span class="nav-mobile-line nav-mobile-line-top {
              isOpen ? 'nav-mobile-line-open-top' : ''
            }"></span>
            <!-- Middle line -->
            <span class="nav-mobile-line nav-mobile-line-middle {
              isOpen ? 'nav-mobile-line-open-middle' : ''
            }"></span>
            <!-- Bottom line -->
            <span class="nav-mobile-line nav-mobile-line-bottom {
              isOpen ? 'nav-mobile-line-open-bottom' : ''
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
  /* ==== ADVANCED NAVIGATION DESIGN SYSTEM ==== */
  /* Using theme colors from app.css for consistent branding */

  /* Navigation Container States */
  .nav-visible {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(var(--color-neutral-200), 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(0);
    opacity: 1;
  }

  .nav-hidden {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(var(--color-neutral-200), 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible {
      background: rgba(var(--color-neutral-900), 0.95);
      border-bottom: 1px solid rgba(var(--color-neutral-700), 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .nav-hidden {
      background: rgba(var(--color-neutral-900), 0.95);
      border-bottom: 1px solid rgba(var(--color-neutral-700), 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
  }

  /* ==== LOGO SYSTEM ==== */
  .logo-container {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, var(--color-purple-600), var(--color-primary-600));
    border-radius: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    .logo-container {
      width: 2.75rem;
      height: 2.75rem;
    }
  }

  .logo-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--color-purple-500), var(--color-primary-500));
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .logo-container:hover .logo-glow {
    opacity: 0.3;
  }

  .logo-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 1024px) {
    .logo-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  /* Logo Text Styling */
  .logo-text-primary {
    font-size: 1.125rem;
    font-weight: 900;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  @media (min-width: 1024px) {
    .logo-text-primary {
      font-size: 1.25rem;
    }
  }

  .nav-visible .logo-text-primary {
    color: var(--color-neutral-900);
  }

  .nav-hidden .logo-text-primary {
    color: var(--color-neutral-900);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .logo-text-primary,
    .nav-hidden .logo-text-primary {
      color: white;
    }
  }

  .logo-text-secondary {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    margin-top: -0.125rem;
    letter-spacing: 0.02em;
  }

  .nav-visible .logo-text-secondary,
  .nav-hidden .logo-text-secondary {
    color: var(--color-neutral-600);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .logo-text-secondary,
    .nav-hidden .logo-text-secondary {
      color: var(--color-neutral-400);
    }
  }

  /* ==== NAVIGATION LINKS ==== */
  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.625rem 1rem;
    border-radius: 0.875rem;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    isolation: isolate;
  }

  .nav-link-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 2;
  }

  .nav-link-icon {
    width: 1rem;
    height: 1rem;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-link-text {
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-link-bg {
    position: absolute;
    inset: 0;
    background: rgba(var(--color-purple-500), 0.1);
    border-radius: inherit;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
  }

  .nav-link-indicator {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.25rem;
    height: 0.25rem;
    background: var(--color-purple-600);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  /* Navigation Link States - Always Visible with Solid Background */
  .nav-visible .nav-link,
  .nav-hidden .nav-link {
    color: var(--color-neutral-700);
  }

  .nav-visible .nav-link:hover,
  .nav-hidden .nav-link:hover {
    color: var(--color-purple-700);
    transform: translateY(-1px);
  }

  .nav-visible .nav-link:hover .nav-link-bg,
  .nav-hidden .nav-link:hover .nav-link-bg {
    opacity: 1;
    transform: scale(1);
    background: rgba(var(--color-purple-500), 0.1);
  }

  .nav-visible .nav-link:hover .nav-link-icon,
  .nav-hidden .nav-link:hover .nav-link-icon {
    transform: scale(1.1) rotate(3deg);
  }

  .nav-visible .nav-link-active,
  .nav-hidden .nav-link-active {
    color: var(--color-purple-700);
    background: rgba(var(--color-purple-500), 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .nav-link,
    .nav-hidden .nav-link {
      color: var(--color-neutral-300);
    }

    .nav-visible .nav-link:hover,
    .nav-hidden .nav-link:hover {
      color: var(--color-purple-400);
    }

    .nav-visible .nav-link:hover .nav-link-bg,
    .nav-hidden .nav-link:hover .nav-link-bg {
      background: rgba(var(--color-purple-400), 0.15);
    }

    .nav-visible .nav-link-active,
    .nav-hidden .nav-link-active {
      color: var(--color-purple-400);
      background: rgba(var(--color-purple-400), 0.15);
    }
  }

  /* ==== NAVIGATION CONTROLS ==== */
  .nav-control-btn {
    position: relative;
    padding: 0.5rem;
    border-radius: 0.875rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
  }

  .nav-control-content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    position: relative;
    z-index: 2;
  }

  .nav-control-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-control-text {
    font-size: 0.75rem;
    font-weight: 700;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-visible .nav-control-btn,
  .nav-hidden .nav-control-btn {
    color: var(--color-neutral-600);
  }

  .nav-visible .nav-control-btn:hover,
  .nav-hidden .nav-control-btn:hover {
    color: var(--color-purple-600);
    background: rgba(var(--color-purple-500), 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .nav-control-btn,
    .nav-hidden .nav-control-btn {
      color: var(--color-neutral-400);
    }

    .nav-visible .nav-control-btn:hover,
    .nav-hidden .nav-control-btn:hover {
      color: var(--color-purple-400);
      background: rgba(var(--color-purple-400), 0.15);
    }
  }

  .nav-control-btn:hover .nav-control-icon,
  .nav-control-btn:hover .nav-control-text {
    transform: scale(1.05);
  }

  /* ==== CTA BUTTON ==== */
  .nav-cta-btn {
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: linear-gradient(135deg, var(--color-purple-600), var(--color-primary-600));
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 0.875rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(var(--color-purple-600), 0.3);
  }

  .nav-cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--color-purple-700), var(--color-primary-700));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .nav-cta-btn:hover::before {
    opacity: 1;
  }

  .nav-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(var(--color-purple-600), 0.4);
  }

  .nav-cta-icon,
  .nav-cta-text {
    position: relative;
    z-index: 2;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-cta-icon {
    width: 1rem;
    height: 1rem;
  }

  .nav-cta-btn:hover .nav-cta-icon {
    transform: scale(1.1) rotate(-3deg);
  }

  /* ==== MOBILE MENU BUTTON ==== */
  .nav-mobile-btn {
    position: relative;
    padding: 0.5rem;
    border-radius: 0.875rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-mobile-hamburger {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-mobile-line {
    position: absolute;
    width: 1.25rem;
    height: 0.125rem;
    border-radius: 0.125rem;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-visible .nav-mobile-line,
  .nav-hidden .nav-mobile-line {
    background: var(--color-neutral-700);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .nav-mobile-line,
    .nav-hidden .nav-mobile-line {
      background: var(--color-neutral-300);
    }
  }

  .nav-mobile-line-top {
    transform: translateY(-0.375rem);
  }

  .nav-mobile-line-bottom {
    transform: translateY(0.375rem);
  }

  .nav-mobile-line-open-top {
    transform: rotate(45deg) translateY(0);
  }

  .nav-mobile-line-open-middle {
    opacity: 0;
    transform: scale(0);
  }

  .nav-mobile-line-open-bottom {
    transform: rotate(-45deg) translateY(0);
  }

  .nav-visible .nav-mobile-btn:hover,
  .nav-hidden .nav-mobile-btn:hover {
    background: rgba(var(--color-purple-500), 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .nav-visible .nav-mobile-btn:hover,
    .nav-hidden .nav-mobile-btn:hover {
      background: rgba(var(--color-purple-400), 0.15);
    }
  }

  /* ==== UTILITY CLASSES ==== */
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

  /* ==== ACCESSIBILITY & RESPONSIVENESS ==== */
  
  /* Focus States */
  @supports selector(:focus-visible) {
    .nav-link:focus,
    .nav-control-btn:focus,
    .nav-cta-btn:focus,
    .nav-mobile-btn:focus {
      outline: none;
    }
    
    .nav-link:focus-visible,
    .nav-control-btn:focus-visible,
    .nav-cta-btn:focus-visible,
    .nav-mobile-btn:focus-visible {
      outline: 2px solid var(--color-purple-500);
      outline-offset: 2px;
    }
  }

  /* Reduced Motion */
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

  /* High Contrast */
  @media (prefers-contrast: high) {
    .nav-link,
    .nav-control-btn,
    .nav-cta-btn,
    .nav-mobile-btn {
      border: 1px solid currentColor;
    }
    
    .mobile-menu-content {
      border: 2px solid currentColor;
    }
  }

  /* RTL Support */
  [dir="rtl"] .nav-link-content {
    flex-direction: row-reverse;
  }

  [dir="rtl"] .nav-control-content {
    flex-direction: row-reverse;
  }

  [dir="rtl"] .nav-cta-btn {
    flex-direction: row-reverse;
  }

  /* Performance Optimizations */
  .nav-link,
  .nav-control-btn,
  .nav-cta-btn,
  .nav-mobile-btn {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
</style>