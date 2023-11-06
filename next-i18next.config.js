// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'ja', 'vi', 'th'],
    defaultLocale: 'en',
    localeDetection: false
  },
  defaultNS: 'common@default',
  localePath: path.resolve('./lang'),
  reloadOnPrerender: !['production', 'staging'].includes(process.env.ENV),
}
