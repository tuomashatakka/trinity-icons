const { readAll, generateJSON } = require('./svg')
const { BASE_PATH } = require('./utils')

let src = process.argv[2] || BASE_PATH

readAll({
  src,
  dst: 'public/icons.svg'
})

// generateJSON({
//   src,
//   dst: 'public/icons.js'
// })
