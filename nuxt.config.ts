// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/fonts'
  ],
  css: [
    '@/assets/scss/global.scss'
  ],
  devServer: {
    port: 4000, // default: 3000
    // host: '0.0.0.0' // default: localhost
  },

  // Add app configuration for head elements
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})