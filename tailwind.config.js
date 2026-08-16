/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: '#EFEDE6', // Exact warm beige-cream from drinkstill.nz reference
        ink: {
          DEFAULT: '#0F2242',
          deep: '#081220',
          slate: '#1E3A68',
        },
        mist: '#808A9D',
        alpine: '#6FA23A',
        gold: {
          DEFAULT: '#B8944F',
          light: '#E2C280',
          amber: '#E8C9A0',
        },
        teal: '#BCD3D8',
        purple: '#C9B5C8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        wordmark: ['Outfit', 'Space Grotesk', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
