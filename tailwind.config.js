/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#060608",
          900: "#0b0b0f",
          850: "#111117",
          800: "#171720",
          700: "#22222f",
        },
        gold: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        },
        ember: {
          500: "#ff5722",
          600: "#f4511e",
        }
      },
      fontFamily: {
        sans: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'glowSpin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 50px -10px rgba(234, 179, 8, 0.25)',
        'gold-glow-lg': '0 0 80px -15px rgba(234, 179, 8, 0.35)',
        'ember-glow': '0 0 60px -10px rgba(255, 87, 34, 0.3)',
        'luxury-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
