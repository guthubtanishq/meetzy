/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#f5f7f9', // Soft Pearl/Mist base
        'bg-surface': 'rgba(255, 255, 255, 0.7)',
        'bg-surface-light': 'rgba(255, 255, 255, 0.4)',
        'text-main': '#2d3748',
        'text-muted': '#718096',
        'sage': '#8caf9f', // Muted sage
        'lavender': '#a3a6cc', // Softer lavender
        'amber': '#d2b48c',
        'rose': '#e2a7a7',
        'sky': '#a0c4ff',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['Inter', 'sans-serif'],
        accent: ['Nunito', 'sans-serif'],
        mono: ['Nunito', 'monospace'],
      },
      backgroundImage: {
        'gradient-calm': 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      }
    },
  },
  plugins: [],
}
