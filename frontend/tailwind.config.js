/** @type {import('tailwindcss').Config} */
export default {
  // 1. Tell Tailwind where your files are
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/index.css',
  ],
  theme: {
    extend: {
      // 2. Standardized color palette based on logo
      colors: {
        // Primary accent - Warm Tan (from logo)
        accent: {
          DEFAULT: '#D1B68A',
          light: '#e0cba8',
          dark: '#b58e5a',
        },
        // Backgrounds
        cream: '#F5F4F0',
        'dark-teal': '#182527',
        // Text colors
        charcoal: '#333333',
        // Secondary accent
        'muted-teal': '#3A5A5C',
      },
      // 3. Set the default font
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
