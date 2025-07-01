<script>
  import { page } from '$app/stores';
  import { locale, t } from '$lib/stores/locale.js';
  import { theme } from '$lib/stores/theme.js';
  
  let isMenuOpen = false;
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

<header class="header">
  <div class="container-wide">
    <div class="header-container">
      <!-- Logo -->
      <a href="/" style="font-weight: 700; font-size: 1.125rem; color: var(--text-dark); text-decoration: none;">
        Pioneer Consultants
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="nav-desktop">
        {#each navItems as item}
          <a href={item.href}
             class="nav-link"
             style="font-weight: {isActiveRoute(item.href) ? '600' : '400'}; color: {isActiveRoute(item.href) ? 'var(--text-dark)' : 'var(--text-gray)'};">
            {$t(item.label)}
          </a>
        {/each}
      </nav>
      
      <!-- Controls -->
      <div class="controls">
        <button on:click={() => theme.toggle()} 
                style="padding: var(--space-2); background: none; border: 1px solid var(--bg-gray); border-radius: var(--space-1); cursor: pointer; font-size: 0.875rem; color: var(--text-gray);">
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
        
        <button on:click={() => locale.toggle()} 
                class="btn-secondary"
                style="font-size: 0.75rem; padding: var(--space-2) var(--space-4);">
          {currentLocale === 'en' ? 'عربي' : 'EN'}
        </button>
        
        <!-- Mobile menu toggle -->
        <button on:click={toggleMenu} 
                class="mobile-toggle"
                aria-label="Toggle mobile menu"
                style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center;">
          {#if isMenuOpen}
            <!-- Close icon (X) -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          {:else}
            <!-- Hamburger icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <div class="mobile-menu">
    <div class="container-wide">
      <div class="mobile-nav">
        {#each navItems as item}
          <a href={item.href}
             on:click={closeMenu}
             class="nav-link"
             style="font-weight: {isActiveRoute(item.href) ? '600' : '400'}; color: {isActiveRoute(item.href) ? 'var(--text-dark)' : 'var(--text-gray)'}; padding: var(--space-3) 0; border-bottom: 1px solid var(--bg-gray);">
            {$t(item.label)}
          </a>
        {/each}
        
        <!-- Mobile theme and language controls -->
        <div style="display: flex; gap: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--bg-gray); margin-top: var(--space-4);">
          <button on:click={() => { theme.toggle(); closeMenu(); }} 
                  style="padding: var(--space-3) var(--space-4); background: none; border: 1px solid var(--bg-gray); border-radius: var(--space-1); cursor: pointer; font-size: 0.875rem; color: var(--text-gray); display: flex; align-items: center; gap: var(--space-2);">
            {currentTheme === 'light' ? '🌙' : '☀️'}
            <span>{currentTheme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          
          <button on:click={() => { locale.toggle(); closeMenu(); }} 
                  class="btn-secondary"
                  style="font-size: 0.875rem; padding: var(--space-3) var(--space-4);">
            {currentLocale === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}