/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte}'],
    theme: {
      extend: {
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'gradient': 'gradient 15s ease infinite',
          'spin-slow': 'spin 8s linear infinite',
          'bounce-slow': 'bounce 3s ease-in-out infinite'
        }
      }
    },
    plugins: []
  }