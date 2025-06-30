<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';
  import { theme } from '$lib/stores/theme.js';
  import { animations } from '$lib/utils/animations.js';
  import gsap from 'gsap';
  
  let isMenuOpen = false;
  let scrolled = false;
  let currentTheme = 'light';
  let currentLocale = 'en';
  let headerRef;
  let logoRef;
  let mobileMenuRef;
  let menuButtonRef;
  
  // Subscribe to stores
  $: currentTheme = $theme;
  $: currentLocale = $locale;
  
  const navItems = [
    { href: '/', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
    { href: '/services', label: 'nav.services' },
    { href: '/contact', label: 'nav.contact' }
  ];
  
  onMount(() => {
    // Initialize stores
    theme.init();
    locale.init();
    
    // Simple header animation - ensure logo is visible first
    gsap.set(logoRef, { opacity: 1, scale: 1, rotation: 0 });
    animations.fadeIn(headerRef, { duration: 0.8 });
    
    // Simple scroll handler
    const handleScroll = () => {
      const newScrolled = window.scrollY > 20;
      if (newScrolled !== scrolled) {
        scrolled = newScrolled;
        headerRef.classList.toggle('scrolled', scrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Close menu on route change
    const unsubscribe = page.subscribe(() => {
      if (isMenuOpen) {
        closeMenu();
      }
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      animations.cleanup();
    };
  });
  
  // Simplified menu functions
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  function openMenu() {
    isMenuOpen = true;
    mobileMenuRef.style.display = 'block';
    
    // Simple fade in
    gsap.fromTo(mobileMenuRef,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
    
    // Animate menu items
    const menuItems = mobileMenuRef.querySelectorAll('.mobile-nav-item');
    gsap.fromTo(menuItems,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1 }
    );
    
    // Animate hamburger to X
    animateToX();
  }
  
  function closeMenu() {
    // Animate out
    gsap.to(mobileMenuRef, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        isMenuOpen = false;
        mobileMenuRef.style.display = 'none';
      }
    });
    
    // Animate X back to hamburger
    animateToHamburger();
  }
  
  function animateToX() {
    const spans = menuButtonRef.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.2 });
    gsap.to(spans[1], { opacity: 0, duration: 0.2 });
    gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.2 });
  }
  
  function animateToHamburger() {
    const spans = menuButtonRef.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.2 });
    gsap.to(spans[1], { opacity: 1, duration: 0.2 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.2 });
  }
  
  // Simple hover effects
  function handleNavHover(event, isEnter) {
    const underline = event.currentTarget.querySelector('.nav-underline');
    if (underline) {
      gsap.to(underline, {
        scaleX: isEnter ? 1 : 0,
        duration: 0.2
      });
    }
  }
  
  function handleButtonHover(button, isEnter) {
    gsap.to(button, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.2
    });
  }
  
  // Helper function for nav item classes
  function getNavItemClasses(itemHref) {
    const isActive = $page.url.pathname === itemHref;
    let classes = "mobile-nav-item block py-4 px-4 font-medium transition-all duration-300 rounded-xl relative group";
    
    if (isActive) {
      classes += " bg-primary-100 text-primary-700";
    } else {
      classes += " text-neutral-700 hover:bg-primary-50 hover:text-primary-600";
    }
    
    // Add dark mode classes
    if (isActive) {
      classes += " dark:bg-primary-900 dark:text-primary-300";
    } else {
      classes += " dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-primary-400";
    }
    
    return classes;
  }
</script>

<header bind:this={headerRef} 
        class="fixed top-0 w-full z-50 header-main">
  <nav class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Fixed Logo -->
      <a href="/" 
         bind:this={logoRef}
         class="flex items-center space-x-3 group rtl:space-x-reverse logo-container"
         on:mouseenter={() => handleButtonHover(logoRef, true)}
         on:mouseleave={() => handleButtonHover(logoRef, false)}>
        <div class="relative logo-wrapper">
          <div class="logo-bg w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 
                      rounded-xl flex items-center justify-center shadow-lg
                      transition-all duration-300 group-hover:shadow-xl">
            <span class="text-white font-bold text-xl relative z-10">P</span>
          </div>
          <!-- Animated ring -->
          <div class="logo-ring absolute inset-0 rounded-xl border-2 border-primary-400 
                      opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125
                      transition-all duration-300"></div>
        </div>
        <span class="logo-text font-sans font-bold text-xl text-gradient hidden sm:block">
          Pioneer Consultants
        </span>
      </a>
      
      <!-- Desktop Navigation with Better Contrast -->
      <div class="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
        {#each navItems as item}
          <a href={item.href}
             on:mouseenter={(e) => handleNavHover(e, true)}
             on:mouseleave={(e) => handleNavHover(e, false)}
             class="relative font-semibold transition-colors duration-300 nav-link nav-item-enhanced"
             class:active={$page.url.pathname === item.href}>
            <span class="nav-text">
              {$t(item.label)}
            </span>
            <span class="nav-underline absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 
                         origin-left transition-transform duration-300"
                  style="transform: scaleX({$page.url.pathname === item.href ? 1 : 0})"></span>
          </a>
        {/each}
        
        <!-- Theme Toggle with Better Visibility -->
        <button on:click={() => theme.toggle()}
                class="control-button p-3 rounded-xl transition-all duration-300"
                on:mouseenter={(e) => handleButtonHover(e.currentTarget, true)}
                on:mouseleave={(e) => handleButtonHover(e.currentTarget, false)}
                aria-label="Toggle theme">
          <div class="w-5 h-5 transition-transform duration-300 icon-enhanced">
            {#if currentTheme === 'light'}
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            {:else}
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            {/if}
          </div>
        </button>
        
        <!-- Language Toggle with Better Contrast -->
        <button on:click={() => locale.toggle()}
                class="control-button px-4 py-2 rounded-xl border-2 transition-all duration-300 font-semibold text-sm"
                on:mouseenter={(e) => handleButtonHover(e.currentTarget, true)}
                on:mouseleave={(e) => handleButtonHover(e.currentTarget, false)}>
          {currentLocale === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
      
      <!-- Mobile Menu Button with Better Contrast -->
      <button bind:this={menuButtonRef}
              on:click={toggleMenu}
              class="xl:hidden relative w-12 h-12 rounded-xl transition-all duration-300 
                     flex items-center justify-center hamburger-button"
              aria-label="Toggle menu">
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span class="hamburger-line block h-0.5 w-full transition-all duration-300"></span>
          <span class="hamburger-line block h-0.5 w-full transition-all duration-300"></span>
          <span class="hamburger-line block h-0.5 w-full transition-all duration-300"></span>
        </div>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div bind:this={mobileMenuRef} 
         class="xl:hidden overflow-hidden mt-4" 
         style="display: none;">
      <div class="glass-card p-6 space-y-1">
        {#each navItems as item}
          <a href={item.href}
             on:click={closeMenu}
             class={getNavItemClasses(item.href)}>
            <span class="relative z-10 font-medium">{$t(item.label)}</span>
            <!-- Active indicator -->
            {#if $page.url.pathname === item.href}
              <div class="absolute left-0 top-1/2 transform -translate-y-1/2 
                          w-1 h-8 bg-primary-600 rounded-r-full"></div>
            {/if}
          </a>
        {/each}
        
        <!-- Mobile Controls -->
        <div class="flex items-center justify-between pt-6 mt-6 border-t border-neutral-300 dark:border-neutral-600">
          <div class="flex items-center space-x-4">
            <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Theme:
            </span>
            <button on:click={() => theme.toggle()}
                    class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 
                           hover:bg-neutral-200 dark:hover:bg-neutral-600
                           transition-all duration-300">
              <span class="text-2xl">
                {currentTheme === 'light' ? '🌙' : '☀️'}
              </span>
            </button>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Language:
            </span>
            <button on:click={() => locale.toggle()}
                    class="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-500
                           bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200
                           hover:border-primary-600 dark:hover:border-primary-400
                           transition-all duration-300 font-semibold text-sm">
              {currentLocale === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>

<style>
  .header-main {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  .header-main.scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="dark"]) .header-main {
    background-color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="dark"]) .header-main.scrolled {
    background-color: rgba(0, 0, 0, 0.95);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  /* Fixed Logo Styles */
  .logo-container {
    position: relative;
    z-index: 100;
  }
  
  .logo-wrapper {
    position: relative;
    z-index: 101;
  }
  
  .logo-bg {
    position: relative;
    z-index: 102;
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  .logo-text {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  .logo-ring {
    z-index: 100;
  }
  
  /* Enhanced Nav Links with Better Contrast */
  .nav-item-enhanced {
    color: var(--color-neutral-800);
    font-weight: 600;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 10;
  }
  
  .nav-item-enhanced:hover {
    color: var(--color-primary-700);
  }
  
  .nav-item-enhanced.active {
    color: var(--color-primary-600);
    font-weight: 700;
  }
  
  :global([data-theme="dark"]) .nav-item-enhanced {
    color: var(--color-neutral-100);
  }
  
  :global([data-theme="dark"]) .nav-item-enhanced:hover {
    color: var(--color-primary-400);
  }
  
  :global([data-theme="dark"]) .nav-item-enhanced.active {
    color: var(--color-primary-300);
  }
  
  /* Enhanced Control Buttons */
  .control-button {
    background-color: var(--color-neutral-100);
    border-color: var(--color-neutral-300);
    color: var(--color-neutral-700);
  }
  
  .control-button:hover {
    background-color: var(--color-neutral-200);
    border-color: var(--color-primary-600);
    color: var(--color-primary-700);
  }
  
  :global([data-theme="dark"]) .control-button {
    background-color: var(--color-neutral-700);
    border-color: var(--color-neutral-500);
    color: var(--color-neutral-200);
  }
  
  :global([data-theme="dark"]) .control-button:hover {
    background-color: var(--color-neutral-600);
    border-color: var(--color-primary-400);
    color: var(--color-primary-300);
  }
  
  /* Enhanced Hamburger Button */
  .hamburger-button {
    background-color: var(--color-neutral-100);
    color: var(--color-neutral-800);
  }
  
  .hamburger-button:hover {
    background-color: var(--color-neutral-200);
  }
  
  :global([data-theme="dark"]) .hamburger-button {
    background-color: var(--color-neutral-700);
    color: var(--color-neutral-200);
  }
  
  :global([data-theme="dark"]) .hamburger-button:hover {
    background-color: var(--color-neutral-600);
  }
  
  .hamburger-line {
    background-color: var(--color-neutral-800);
  }
  
  :global([data-theme="dark"]) .hamburger-line {
    background-color: var(--color-neutral-200);
  }
  
  /* Enhanced Icons */
  .icon-enhanced {
    color: var(--color-neutral-700);
  }
  
  :global([data-theme="dark"]) .icon-enhanced {
    color: var(--color-neutral-200);
  }
  
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }
  
  .mobile-nav-item:hover {
    transform: translateX(4px);
  }
  
  /* Ensure text gradient is visible */
  .text-gradient {
    background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
</style>