import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#080503',
        dark:     '#110b06',
        surface:  '#1a1009',
        surface2: '#221509',
        brass: { DEFAULT:'#C4963A', light:'#e0b455', dim:'#6b4e1a' },
        cream: { DEFAULT:'#EFD9BC', dim:'#a8927a', faint:'#5a4935' },
      },
      fontFamily: {
        serif: ['Cormorant Garamond','Georgia','serif'],
        sans:  ['Jost','system-ui','sans-serif'],
      },
      transitionDuration: { '400': '400ms' },
    },
  },
  plugins: [],
} satisfies Config
