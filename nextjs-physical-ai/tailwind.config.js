/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0056b3',
        'accent': '#007BFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-kr)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
