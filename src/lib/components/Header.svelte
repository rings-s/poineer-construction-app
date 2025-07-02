<!-- src/lib/components/Header.svelte -->
<script>
  import { page } from '$app/stores';
  import { locale, t } from '$lib/stores/locale.js';
  import { theme } from '$lib/stores/theme.js';
  import { onMount } from 'svelte';
  
  let isMenuOpen = false;
  let isScrolled = false;
  let currentTheme = 'light';
  let currentLocale = 'en';
  
  $: currentTheme = $theme;
  $: currentLocale = $locale;
  
  const navItems = [
    { href: '/', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
    { href: '/services', label: 'nav.services' },
    { href: '/contact', label: 'nav.contact' }
  ];
  
  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function closeMenu() {
    isMenuOpen = false;
  }
  
  function isActiveRoute(href) {
    return $page.url.pathname === href;
  }
</script>

<header class="header" class:header-scrolled={isScrolled}>
  <div class="container-full">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="text-heading-2 text-primary-600 hover:text-primary-700 transition-colors duration-200 font-black">
        Pioneer Consultants
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a 
            href={item.href}
            class="text-body font-medium transition-all duration-200 relative group"
            class:text-primary-600={isActiveRoute(item.href)}
            class:text-neutral-600={!isActiveRoute(item.href)}
          >
            {$t(item.label)}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"
                  class:w-full={isActiveRoute(item.href)}></span>
          </a>
        {/each}
      </nav>
      
      <!-- Controls -->
      <div class="flex items-center space-x-3">
        <!-- Theme Toggle -->
        <button 
          on:click={() => theme.toggle()} 
          class="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 focus-ring"
          aria-label="Toggle theme"
        >
          {#if currentTheme === 'light'}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          {:else}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          {/if}
        </button>
        
        <!-- Language Toggle -->
        <button 
          on:click={() => locale.toggle()} 
          class="btn-outline btn-sm"
        >
          {currentLocale === 'en' ? 'عربي' : 'EN'}
        </button>
        
        <!-- Mobile Menu Toggle -->
        <button 
          on:click={toggleMenu} 
          class="md:hidden p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 focus-ring"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5 transition-transform duration-300" class:rotate-90={isMenuOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <div class="md:hidden bg-white border-b border-neutral-200 animate-slide-up">
    <div class="container-full">
      <nav class="py-4 space-y-2">
        {#each navItems as item}
          <a 
            href={item.href}
            on:click={closeMenu}
            class="block py-3 px-4 rounded-lg text-body font-medium transition-colors duration-200"
            class:bg-primary-50={isActiveRoute(item.href)}
            class:text-primary-600={isActiveRoute(item.href)}
            class:text-neutral-600={!isActiveRoute(item.href)}
            class:hover:bg-neutral-50={!isActiveRoute(item.href)}
          >
            {$t(item.label)}
          </a>
        {/each}
      </nav>
    </div>
  </div>
{/if}