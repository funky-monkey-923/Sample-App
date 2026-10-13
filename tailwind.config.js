/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          cream: '#FDFCF0',     // Lofi/Island base
          sage: '#B2C9AB',      // Farm-sim greenery
          terracotta: '#E2725B', // Farm-sim warmth
          amber: '#FFBF00',     // Lofi glow
          sky: '#B9D9EB',       // Island softness
          deep: '#4A4E69',      // Lofi depth
        },
      },
      borderRadius: {
        'cozy': '2rem',
      },
      boxShadow: {
        'cozy': '0 10px 25px -5px rgba(74, 78, 105, 0.1), 0 8px 10px -6px rgba(74, 78, 105, 0.1)',
        'glow': '0 0 15px rgba(255, 191, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
