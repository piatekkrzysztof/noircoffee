import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso:  '#0d0906',
        dark:      '#130d09',
        surface:   '#1a120c',
        surface2:  '#241a12',
        surface3:  '#2e2118',
        brass: {
          DEFAULT: '#C4963A',
          light:   '#d9b062',
          dim:     '#8a6924',
        },
        cream: {
          DEFAULT: '#F0E0C8',
          dim:     '#c2ae96',
          faint:   '#a08c74',
        },
        paper: '#efe2cc',
        ember: '#e0937c',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Geist', 'system-ui', 'sans-serif'],
      },
      zIndex: {
        base:    '1',
        raised:  '10',
        nav:     '50',
        overlay: '60',
        grain:   '70',
      },
      maxWidth: {
        shell: '1440px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
