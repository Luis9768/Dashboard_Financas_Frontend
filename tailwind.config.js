/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // Ultra black
        surface: '#0a0a0a', // Almost black for cards
        surfaceHighlight: '#171717', // Slightly lighter for hovers
        primary: '#8b5cf6', // Vibrant Purple (Neon)
        primaryDark: '#6d28d9',
        receita: '#10b981', // Neon Green
        despesa: '#f43f5e', // Neon Red
      },
      boxShadow: {
        'neon-primary': '0 0 20px -5px rgba(139, 92, 246, 0.4)',
        'neon-receita': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'neon-despesa': '0 0 20px -5px rgba(244, 63, 94, 0.4)',
      }
    },
  },
  plugins: [],
}
