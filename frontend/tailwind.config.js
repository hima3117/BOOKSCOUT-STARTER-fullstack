/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          600: "#2563eb",
        },
      },

      boxShadow: {
        soft: "0 10px 30px rgba(15,23,42,0.08)",
      },
    },
  },

  plugins: [],
};