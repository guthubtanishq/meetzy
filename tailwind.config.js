/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0d0f14',
        'bg-surface': '#13161e',
        'bg-surface-light': '#1a1e28',
        'sage': '#7eb8a4',
        'lavender': '#9b8ec4',
        'amber': '#b8a07e',
        'rose': '#c49b9b',
        'sky': '#7e9eb8',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'serif'],
        ui: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
