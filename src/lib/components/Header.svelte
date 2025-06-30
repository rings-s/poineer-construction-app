<!-- src/lib/components/Header.svelte -->
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
    
    // Header entrance animation
    gsap.set(logoRef, { opacity: 1, scale: 1 });
    animations.fadeIn(headerRef, { duration: 0.8, delay: 0.2 });
    
    // Scroll handler with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const newScrolled = window.scrollY > 20;
          if (newScrolled !== scrolled) {
            scrolled = newScrolled;
            headerRef?.classList.toggle('scrolled', scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
    
    // Menu entrance animation
    gsap.fromTo(mobileMenuRef,
      { opacity: 0, y: -20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
    
    // Stagger menu items
    const menuItems = mobileMenuRef.querySelectorAll('.mobile-nav-item');
    gsap.fromTo(menuItems,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
    );
    
    // Hamburger to X animation
    animateToX();
  }
  
  function closeMenu() {
    gsap.to(mobileMenuRef, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        isMenuOpen = false;
        mobileMenuRef.style.display = 'none';
      }
    });
    
    animateToHamburger();
  }
  
  function animateToX() {
    const spans = menuButtonRef.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3, ease: 'power2.out' });
    gsap.to(spans[1], { opacity: 0, scale: 0, duration: 0.2 });
    gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3, ease: 'power2.out' });
  }
  
  function animateToHamburger() {
    const spans = menuButtonRef.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to(spans[1], { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
  }
  
  function handleNavHover(event, isEnter) {
    const underline = event.currentTarget.querySelector('.nav-underline');
    if (underline) {
      gsap.to(underline, {
        scaleX: isEnter ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
  
  function handleButtonHover(button, isEnter) {
    gsap.to(button, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  
  function getNavItemClasses(itemHref) {
    const isActive = $page.url.pathname === itemHref;
    let classes = "mobile-nav-item block py-4 px-6 font-medium transition-all duration-300 rounded-2xl relative group";
    
    if (isActive) {
      classes += " bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg";
    } else {
      classes += " text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700";
    }
    
    // Dark mode classes
    if (isActive) {
      classes += " dark:from-primary-600 dark:to-primary-700";
    } else {
      classes += " dark:text-neutral-200 dark:hover:from-primary-900 dark:hover:to-primary-800 dark:hover:text-primary-300";
    }
    
    return classes;
  }
</script>

<header bind:this={headerRef} 
        class="fixed top-0 w-full z-50 header-main transition-all duration-300">
  <nav class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Enhanced Logo -->
      <a href="/" 
         bind:this={logoRef}
         class="flex items-center space-x-3 group rtl:space-x-reverse logo-container"
         on:mouseenter={() => handleButtonHover(logoRef, true)}
         on:mouseleave={() => handleButtonHover(logoRef, false)}>
        <div class="relative logo-wrapper">
          <div class="logo-bg w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 
                      rounded-2xl flex items-center justify-center shadow-xl
                      transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary-500/25
                      group-hover:rotate-3 transform-gpu">
            <span class="text-white font-bold text-xl relative z-10 group-hover:scale-110 transition-transform duration-300">P</span>
            <!-- Animated glow effect -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 
                        opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500 -z-10"></div>
          </div>
          <!-- Animated ring -->
          <div class="logo-ring absolute inset-0 rounded-2xl border-2 border-primary-400 
                      opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125
                      transition-all duration-500 animate-pulse"></div>
        </div>
        <div class="logo-text-container">
          <span class="logo-text font-sans font-bold text-xl bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 
                       bg-clip-text text-transparent hidden sm:block group-hover:from-primary-500 group-hover:to-accent-500
                       transition-all duration-300">
            Pioneer Consultants
          </span>
          <span class="text-xs text-neutral-500 dark:text-neutral-400 hidden md:block font-medium tracking-wide">
            {$t('hero.title2')}
          </span>
        </div>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
        {#each navItems as item}
          <a href={item.href}
             on:mouseenter={(e) => handleNavHover(e, true)}
             on:mouseleave={(e) => handleNavHover(e, false)}
             class="relative font-semibold text-neutral-800 dark:text-neutral-200 
                    transition-all duration-300 nav-link group py-2 px-1"
             class:active={$page.url.pathname === item.href}>
            <span class="nav-text relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {$t(item.label)}
            </span>
            <span class="nav-underline absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 
                         origin-left transition-transform duration-300 rounded-full"
                  style="transform: scaleX({$page.url.pathname === item.href ? 1 : 0})"></span>
            <!-- Hover background -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900
                        opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300 -z-10"></div>
          </a>
        {/each}
        
        <!-- Enhanced Theme Toggle -->
        <button on:click={() => theme.toggle()}
                class="control-button p-3 rounded-2xl transition-all duration-300 group
                       bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800
                       hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-800 dark:hover:to-accent-800
                       shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-600"
                on:mouseenter={(e) => handleButtonHover(e.currentTarget, true)}
                on:mouseleave={(e) => handleButtonHover(e.currentTarget, false)}
                aria-label={$t('common.close')}>
          <div class="w-5 h-5 transition-all duration-500 group-hover:rotate-180">
            {#if currentTheme === 'light'}
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full text-neutral-600 group-hover:text-primary-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            {:else}
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full text-neutral-300 group-hover:text-accent-400">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            {/if}
          </div>
        </button>
        
        <!-- Enhanced Language Toggle -->
        <button on:click={() => locale.toggle()}
                class="control-button px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm
                       bg-gradient-to-r from-primary-500 to-accent-500 text-white
                       hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl
                       border border-primary-400 hover:border-primary-300"
                on:mouseenter={(e) => handleButtonHover(e.currentTarget, true)}
                on:mouseleave={(e) => handleButtonHover(e.currentTarget, false)}>
          <span class="relative z-10">
            {currentLocale === 'en' ? 'عربي' : 'EN'}
          </span>
          <!-- Button glow effect -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-accent-400 
                      opacity-0 hover:opacity-75 blur-lg transition-all duration-300 -z-10"></div>
        </button>
      </div>
      
      <!-- Enhanced Mobile Menu Button -->
      <button bind:this={menuButtonRef}
              on:click={toggleMenu}
              class="xl:hidden relative w-12 h-12 rounded-2xl transition-all duration-300 
                     flex items-center justify-center hamburger-button group
                     bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800
                     hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-800 dark:hover:to-accent-800
                     shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-600"
              aria-label={$t('nav.menu')}>
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span class="hamburger-line block h-0.5 w-full bg-neutral-700 dark:bg-neutral-200 
                       transition-all duration-300 group-hover:bg-primary-600 dark:group-hover:bg-primary-400"></span>
          <span class="hamburger-line block h-0.5 w-full bg-neutral-700 dark:bg-neutral-200 
                       transition-all duration-300 group-hover:bg-primary-600 dark:group-hover:bg-primary-400"></span>
          <span class="hamburger-line block h-0.5 w-full bg-neutral-700 dark:bg-neutral-200 
                       transition-all duration-300 group-hover:bg-primary-600 dark:group-hover:bg-primary-400"></span>
        </div>
      </button>
    </div>
    
    <!-- Enhanced Mobile Navigation -->
    <div bind:this={mobileMenuRef} 
         class="xl:hidden overflow-hidden mt-6" 
         style="display: none;">
      <div class="glass-card-enhanced p-8 space-y-2 backdrop-blur-xl bg-white/90 dark:bg-black/90
                  border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl">
        {#each navItems as item}
          <a href={item.href}
             on:click={closeMenu}
             class={getNavItemClasses(item.href)}>
            <span class="relative z-10 font-semibold tracking-wide">{$t(item.label)}</span>
            <!-- Active indicator -->
            {#if $page.url.pathname === item.href}
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 
                          w-1 h-8 bg-gradient-to-b from-accent-400 to-accent-600 rounded-r-full
                          shadow-lg shadow-accent-500/50"></div>
            {/if}
          </a>
        {/each}
        
        <!-- Mobile Controls -->
        <div class="flex items-center justify-between pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center space-x-4">
            <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Theme:
            </span>
            <button on:click={() => theme.toggle()}
                    class="p-3 rounded-2xl bg-gradient-to-r from-neutral-100 to-neutral-200 
                           dark:from-neutral-700 dark:to-neutral-800
                           hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-800 dark:hover:to-accent-800
                           transition-all duration-300 shadow-md hover:shadow-lg">
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
                    class="px-4 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white
                           hover:from-primary-600 hover:to-accent-600 transition-all duration-300 
                           font-bold text-sm shadow-lg hover:shadow-xl border border-primary-400">
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
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  .header-main.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(30px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="dark"]) .header-main {
    background: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="dark"]) .header-main.scrolled {
    background: rgba(0, 0, 0, 0.95);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .logo-container {
    position: relative;
    z-index: 100;
  }
  
  .nav-link.active .nav-text {
    color: var(--color-primary-600);
    font-weight: 700;
  }
  
  :global([data-theme="dark"]) .nav-link.active .nav-text {
    color: var(--color-primary-400);
  }
  
  .glass-card-enhanced {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.8) 50%, 
      rgba(255, 255, 255, 0.9) 100%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  
  :global([data-theme="dark"]) .glass-card-enhanced {
    background: linear-gradient(135deg, 
      rgba(0, 0, 0, 0.9) 0%, 
      rgba(0, 0, 0, 0.8) 50%, 
      rgba(0, 0, 0, 0.9) 100%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .mobile-nav-item:hover {
    transform: translateX(8px);
  }
  
  :global([dir="rtl"]) .mobile-nav-item:hover {
    transform: translateX(-8px);
  }
</style>