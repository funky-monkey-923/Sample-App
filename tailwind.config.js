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
          cream: '#F7F3E3',     // Slightly deeper cream
          sky: '#B2D4E5',       // More saturated sky
          sage: '#9DB59D',       // Deeper sage for better contrast
          terracotta: '#D3624A', // Richer terracotta
          amber: '#E6B400',      // Deeper amber
          deep: '#3D405B',       // Darker navy/purple for text
        },
      },
      borderRadius: {
        'cozy': '2rem',
      },
      boxShadow: {
        'cozy': '0 10px 25px -5px rgba(61, 64, 91, 0.1), 0 8px 10px -6px rgba(61, 64, 91, 0.1)',
        'glow': '0 0 15px rgba(230, 180, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
