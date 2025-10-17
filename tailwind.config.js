/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          50: "#E0E7FF",
          100: "#C7D2FE",
          200: "#A5B4FC",
          300: "#818CF8",
          400: "#6366F1",
          500: "#4F46E5",
          600: "#1E3A8A",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#1E3A8A",
        },
        accent: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
      },
    },
  },
  plugins: [],
};

