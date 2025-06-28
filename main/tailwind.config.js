// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      fontFamily: {
          // English fonts
          'sans': ['Poppins', 'DM Sans', 'system-ui', 'sans-serif'],
          'display': ['Poppins', 'DM Sans', 'system-ui', 'sans-serif'],

          // Arabic fonts
          'arabic': ['Cairo', 'Almarai', 'Tajawal', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
          'arabic-display': ['Cairo', 'Almarai', 'system-ui', 'sans-serif'],

          // Combined (for mixed content)
          'mixed': ['Cairo', 'Poppins', 'system-ui', 'sans-serif'],
        },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },
  plugins: []
}