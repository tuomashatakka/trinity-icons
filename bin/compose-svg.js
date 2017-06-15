const { readAll } = require('./svg')
const { BASE_PATH, print } = require('./utils')

let src = process.argv[2] || BASE_PATH
let dst = 'public/icons.svg'

readAll({ src, dst })
  .then(() => console.log(`
      Successfully concatenated SVG files to ${dst}
      `)
)
.catch(err => console.error("ASLKJDFDF", err))

// generateJSON({
//   src,
//   dst: 'public/icons.js'
// })
