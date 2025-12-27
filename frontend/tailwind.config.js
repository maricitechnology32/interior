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
      colors: {
        // Semantic Color System
        primary: {
          DEFAULT: '#182527', // Dark Teal (Background/Text)
          light: '#2A3F42',
          dark: '#0F1819',
        },
        secondary: {
          DEFAULT: '#D1B68A', // Gold/Tan (Accents)
          light: '#E5D4B3',
          dark: '#B59463',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
          tertiary: '#F3F4F6',
        },
        text: {
          primary: '#182527',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          inverted: '#FFFFFF',
        },
        status: {
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'], // Clean modern sans
        serif: ['"Playfair Display"', 'Georgia', 'serif'], // Elegant headings
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
        'card-hover': '0 0 0 1px rgba(209, 182, 138, 0.5), 0 8px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'btn': '9999px', // Fully rounded buttons
        'card': '1rem', // 16px rounded cards
      }
    },
  },
  plugins: [],
};
