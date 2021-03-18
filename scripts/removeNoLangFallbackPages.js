/* eslint-disable no-console */
const fs = require('fs')

const PAGES_PATH = 'pages'
const LOCALE_PAGES_PATH = `${PAGES_PATH}/[locale]`

// E.g. ['index.tsx', 'about.tsx']
const pageFilenames = fs.readdirSync(LOCALE_PAGES_PATH)

pageFilenames.forEach(filename => {
  fs.unlinkSync(`${PAGES_PATH}/${filename}`)
})