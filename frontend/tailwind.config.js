/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cthulhu-dark': '#1d2531',
        'cthulhu-light': '#a5e5c5',
        'cthulhu-bg': '#f0fafd',
        'cthulhu-accent': '#52a593',
        'cthulhu-deep': '#2b6267',
        'cthulhu-secondary': '#1e303a',
        'cthulhu-gray': '#3b4251',
        'cthulhu-muted': '#527b92',
        'cthulhu-teal': '#7dc1c1',
        'cthulhu-highlight': '#c7fff3',
        'cthulhu-soft': '#b8cbd8',
        'cthulhu-bluegray': '#7e8da1',
        'cthulhu-olive': '#8fa990',
        'cthulhu-beige': '#e5debb',
        'cthulhu-sand': '#cea061',
        'cthulhu-rust': '#854731',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
