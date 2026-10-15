export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
      '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],



  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'pl' },
      title: 'Noir · Kraków Coffee Atelier',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Atelier sensoryczne. Micro-loty, warsztaty cuppingowe i rezerwacje prywatne.' },
        { name: 'theme-color', content: '#0d0906' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Noir · Kraków Coffee Atelier' },
        { property: 'og:image', content: '/images/hero.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Geist:wght@300..600&display=swap',
        },
        { rel: 'preload', as: 'image', href: '/images/found/florianska-noc.jpg' },
      ],
    },
  },

  nitro: {
    preset: 'vercel-static',
  },
})
