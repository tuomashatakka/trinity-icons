const { readAll } = require('./svg')
const { BASE_PATH } = require('./utils')

let src = process.argv[2] || BASE_PATH
let dst = 'public/icons.svg'

readAll({ src, dst })
  .then(() => print(
    `
    Successfully concatenated SVG files to ${dst}
    `
  ))

// generateJSON({
//   src,
//   dst: 'public/icons.js'
// })
