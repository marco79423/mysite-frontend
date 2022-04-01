const withPlugins = require('next-compose-plugins')
const {i18n} = require('./next-i18next.config')

module.exports = withPlugins([], {
  publicRuntimeConfig: require('./runtimeConfig'),

  i18n,

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dice',
      },
    ]
  },
})
