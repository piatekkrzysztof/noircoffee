export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],



  app: {
    head: {
      title: 'Noir · Kraków Coffee Atelier',
      meta: [
        { name: 'description', content: 'Atelier sensoryczne. Micro-loty, warsztaty cuppingowe i rezerwacje prywatne.' },
        { name: 'theme-color', content: '#0b0704' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap',
        },
      ],
    },
  },

  nitro: {
    preset: 'node-server',
  },
})
