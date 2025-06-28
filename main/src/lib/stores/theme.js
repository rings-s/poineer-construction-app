import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create theme store
function createThemeStore() {
  const { subscribe, set, update } = writable('light');
  
  return {
    subscribe,
    init: () => {
      if (browser) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        set(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    },
    toggle: () => {
      update(currentTheme => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        return newTheme;
      });
    },
    setTheme: (theme) => {
      set(theme);
      if (browser) {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
      }
    }
  };
}

export const theme = createThemeStore();