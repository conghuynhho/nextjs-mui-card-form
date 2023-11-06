module.exports = {
  i18n: {
    locales: ['en', 'ja', 'vi', 'th'],
    defaultLocale: 'en',
    localeDetection: false
  },
  defaultNS: 'common@default',
  localePath: './lang',
  reloadOnPrerender: !['production', 'staging'].includes(process.env.ENV),
}
