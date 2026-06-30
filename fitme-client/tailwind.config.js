/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        // --- THIS IS THE NEW BLUE/INDIGO PALETTE ---
        
        // 1. 'primary' is now INDIGO (a rich, professional blue-purple)
        'primary': {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1', // The new main brand color
          '600': '#4f46e5', // A slightly darker version
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
          '950': '#1e1b4b', // The new dark mode background
        },
        
        // 2. We'll use a soft BLUE for light mode and deep SLATE for dark mode
        'light': {
          'bg': '#f0f9ff',      // Main page background (lightest blue - sky-50)
          'card': '#FFFFFF',    // Card background (White)
          'border': '#e2e8f0',  // Borders (slate-200)
        },
        'dark': {
          'bg': '#0f172a',      // Main page background (dark slate-900)
          'card': '#1e293b',    // Card background (dark slate-800)
          'border': '#334155',  // Borders (dark slate-700)
        },
      },
    },
  },
  plugins: [],
}