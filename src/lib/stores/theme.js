// src/lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
  const { subscribe, set, update } = writable('light');
  
  return {
    subscribe,
    init: () => {
      if (browser) {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Check system preference if no saved theme
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme !== 'light' && savedTheme !== 'dark' ? systemPreference : savedTheme;
        
        set(initialTheme);
        applyTheme(initialTheme);
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
          if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            set(newTheme);
            applyTheme(newTheme);
          }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        return () => {
          mediaQuery.removeEventListener('change', handleChange);
        };
      }
    },
    toggle: () => {
      update(currentTheme => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          applyTheme(newTheme);
        }
        return newTheme;
      });
    },
    setTheme: (theme) => {
      set(theme);
      if (browser) {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
      }
    }
  };
}

function applyTheme(theme) {
  if (browser) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Add class for Tailwind dark mode
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#171717' : '#ffffff');
    }
  }
}

export const theme = createThemeStore();