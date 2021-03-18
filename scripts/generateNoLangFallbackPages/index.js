/* eslint-disable no-console */
const fs = require('fs')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')

const PAGES_PATH = 'pages'
const LOCALE_PAGES_PATH = `${PAGES_PATH}/[locale]`
const TEMPLATE_PATH = `${__dirname}/template.js`
const TEMPLATE_COMPONENT_NAME = 'NoLangFallbackPage'

// E.g. ['index.tsx', 'about.tsx']
const pageFilenames = fs.readdirSync(LOCALE_PAGES_PATH)

const pascalCase = text => upperFirst(camelCase(text))

/**
 * E.g.
 * [
 *   {
 *     filename: 'index.tsx'
 *     componentName: 'IndexNoLangFallbackPage'
 *   },
 *   {
 *     filename: 'about.tsx'
 *     componentName: 'AboutNoLangFallbackPage'
 *   }
 * ]
 */
const pages = pageFilenames.map(filename => {
  const pascalCaseName = pascalCase(filename.split('.').shift())
  return {
    filename,
    componentName: `${pascalCaseName}${TEMPLATE_COMPONENT_NAME}`,
  }
})

const template = fs.readFileSync(TEMPLATE_PATH).toString()

pages.forEach(({ filename, componentName }) => {
  const content = template.replace(new RegExp(TEMPLATE_COMPONENT_NAME, 'g'), componentName)
  fs.writeFileSync(`${PAGES_PATH}/${filename}`, content)
})