const { readAll, generateJSON } = require('./svg')
const { BASE_PATH } = require('./utils')


readAll({
  src: BASE_PATH, dst: 'public/icons.svg' })

generateJSON({
  src: BASE_PATH, dst: 'public/icons.js' })
