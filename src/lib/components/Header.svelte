<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { locale, t } from '$lib/stores/locale.js';
    import { theme } from '$lib/stores/theme.js';
    import gsap from 'gsap';
    
    let isMenuOpen = false;
    let scrolled = false;
    let currentTheme = 'light';
    let currentLocale = 'en';
    let mobileMenuRef;
    let headerRef;
    let menuButtonRef;
    let navItemsRef = [];
    
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
      
      // Animate header on load
      gsap.from(headerRef, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      // Animate nav items
      gsap.from(navItemsRef, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out'
      });
      
      const handleScroll = () => {
        const newScrolled = window.scrollY > 20;
        if (newScrolled !== scrolled) {
          scrolled = newScrolled;
          
          // Animate header background on scroll
          if (scrolled) {
            gsap.to(headerRef, {
              backdropFilter: 'blur(20px)',
              backgroundColor: currentTheme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
              duration: 0.3
            });
          } else {
            gsap.to(headerRef, {
              backdropFilter: 'blur(0px)',
              backgroundColor: 'transparent',
              duration: 0.3
            });
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
    
    // Animate mobile menu
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        // Open menu animation
        gsap.set(mobileMenuRef, { display: 'block' });
        gsap.fromTo(mobileMenuRef,
          { height: 0, opacity: 0 },
          { 
            height: 'auto', 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power2.inOut',
            onComplete: () => {
              // Animate menu items
              gsap.from(mobileMenuRef.querySelectorAll('.mobile-nav-item'), {
                x: -50,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power2.out'
              });
            }
          }
        );
        
        // Animate hamburger to X
        const spans = menuButtonRef.querySelectorAll('span');
        gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, x: -20, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
      } else {
        // Close menu animation
        gsap.to(mobileMenuRef, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(mobileMenuRef, { display: 'none' });
          }
        });
        
        // Animate X back to hamburger
        const spans = menuButtonRef.querySelectorAll('span');
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, x: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    }
    
    // Hover animation for nav items
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
  </script>
  
  <header bind:this={headerRef} 
          class="fixed top-0 w-full z-50 transition-all duration-300 header-main">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2 group rtl:space-x-reverse">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center
                      group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            <span class="text-white font-bold text-xl">P</span>
          </div>
          <span class="font-sans font-bold text-xl text-gradient">
            Pioneer Consultants
          </span>
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {#each navItems as item, i}
            <a href={item.href}
               bind:this={navItemsRef[i]}
               on:mouseenter={(e) => handleNavHover(e, true)}
               on:mouseleave={(e) => handleNavHover(e, false)}
               class="relative font-medium transition-colors duration-300
                      hover:text-primary-600 text-neutral-800 dark:text-neutral-200"
               class:text-primary-600={$page.url.pathname === item.href}>
              {$t(item.label)}
              <span class="nav-underline absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 
                           origin-left transition-transform duration-300"
                    style="transform: scaleX({$page.url.pathname === item.href ? 1 : 0})"></span>
            </a>
          {/each}
          
          <!-- Theme Toggle -->
          <button on:click={() => theme.toggle()}
                  class="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 
                         transition-all duration-300 hover:scale-110"
                  aria-label="Toggle theme">
            {#if currentTheme === 'light'}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            {/if}
          </button>
          
          <!-- Language Toggle -->
          <button on:click={() => locale.toggle()}
                  class="px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-600 
                         hover:border-primary-600 dark:hover:border-primary-400
                         transition-all duration-300 font-medium hover:scale-105">
            {currentLocale === 'en' ? 'عربي' : 'EN'}
          </button>
        </div>
        
        <!-- Mobile Menu Button -->
        <button bind:this={menuButtonRef}
                on:click={toggleMenu}
                class="md:hidden relative w-10 h-10 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 
                       transition-colors duration-300 flex items-center justify-center"
                aria-label="Toggle menu">
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span class="block h-0.5 w-full bg-neutral-800 dark:bg-neutral-200 transition-all duration-300"></span>
            <span class="block h-0.5 w-full bg-neutral-800 dark:bg-neutral-200 transition-all duration-300"></span>
            <span class="block h-0.5 w-full bg-neutral-800 dark:bg-neutral-200 transition-all duration-300"></span>
          </div>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div bind:this={mobileMenuRef} class="md:hidden overflow-hidden" style="display: none;">
        <div class="py-4 space-y-2">
          {#each navItems as item, i}
            <a href={item.href}
               on:click={toggleMenu}
               class="mobile-nav-item block py-3 px-4 font-medium transition-all duration-300
                      hover:bg-primary-50 dark:hover:bg-neutral-800 hover:text-primary-600 
                      rounded-lg text-neutral-800 dark:text-neutral-200"
               class:bg-primary-50={$page.url.pathname === item.href}
               class:dark:bg-neutral-800={$page.url.pathname === item.href}
               class:text-primary-600={$page.url.pathname === item.href}>
              {$t(item.label)}
            </a>
          {/each}
          
          <div class="flex items-center space-x-4 pt-4 px-4 border-t border-neutral-200 dark:border-neutral-700">
            <button on:click={() => theme.toggle()}
                    class="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 
                           transition-all duration-300 hover:scale-110">
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <button on:click={() => locale.toggle()}
                    class="px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-600
                           hover:border-primary-600 dark:hover:border-primary-400
                           transition-all duration-300 font-medium text-sm hover:scale-105">
              {currentLocale === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
  
  <style>
    .header-main {
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    
    :global([data-theme="dark"]) .header-main {
      background-color: rgba(0, 0, 0, 0.8);
    }
  </style>