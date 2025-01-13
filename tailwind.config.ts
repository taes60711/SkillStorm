/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 可以在這裡添加自定義顏色
        'primary': '#4a9eff',
        'background': '#121212',
        'surface': '#1e1e1e',
      },
    },
  },
  plugins: [],
}
