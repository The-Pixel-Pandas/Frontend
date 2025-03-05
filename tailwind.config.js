/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0C0724",
        secondary: {
          100: "#0C0724",
          200: "#171134",
          300: "#241C4A"
        },
        blurs: {
          100: "#40C5FF",
          200: "#E46BBB",
          300: "#311B92"
        },
        text: {
          100: "#FFFFFF",
          200: "#B3B3B3",
          300: "#808080"
        }
      }
    }
  },
  plugins: []
};
