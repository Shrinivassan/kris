// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b8daff",
          300: "#7cb9ff",
          400: "#3398ff",
          500: "#007bff",   // your main brand color
          600: "#0066cc",
          700: "#004c99",
          800: "#003366",
          900: "#001a33",
        }
      }
    }
  },
  plugins: []
}
