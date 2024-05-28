/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-emerald-200",
    "bg-emerald-200",
    "border-yellow-200",
    "bg-yellow-200",
    "border-sky-200",
    "bg-sky-200",
    "border-rose-200",
    "bg-rose-200",
  ],
};
