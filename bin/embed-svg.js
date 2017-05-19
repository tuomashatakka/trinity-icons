
const { BASE_PATH } = require('./utils')
const { appendToHTML } = require('./svg')


appendToHTML({
  src: BASE_PATH,
  dst: 'public/index.html' })
