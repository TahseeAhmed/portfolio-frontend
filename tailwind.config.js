/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy:    '#0D1B2A',
        'navy-light': '#112236',
        slate:   '#1E3A5F',
        surface: '#132033',
        border:  '#1E3A5F',
        text:    '#E8EDF3',
        muted:   '#7A93B4',
        gold:    '#C9A84C',
        'gold-light': '#E8C56A',
        teal:    '#2DD4BF',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
