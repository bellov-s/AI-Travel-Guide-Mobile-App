/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#5C3B1E", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#D4A373", foreground: "#333333" },
        destructive: "#E11D48",
        ring: "#5C3B1E",
        accent: "#F0E6DD"
      }
    }
  },
  plugins: []
};
