const { readAll, generateJSON } = require('./svg')
const { BASE_PATH } = require('./utils')


readAll({
  src: BASE_PATH + '-flattened', dst: 'public/icons.svg' })

generateJSON({
  src: BASE_PATH + '-flattened', dst: 'public/icons.js' })
