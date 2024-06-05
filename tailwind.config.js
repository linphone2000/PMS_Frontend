/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-emerald-300",
    "bg-emerald-300",
    "border-yellow-300",
    "bg-yellow-300",
    "border-sky-300",
    "bg-sky-300",
    "border-rose-300",
    "bg-rose-300",
    "border-lime-300",
    "bg-lime-300",
  ],
};
