
const { readdirSync, createWriteStream } = require("fs")
const { resolve, basename } = require("path")


const BASE_PATH = resolve(__dirname + '/../assets/icons')


function getSVGFiles (dir=BASE_PATH) {
  let files = readdirSync(resolve(dir))
    .filter(name => name.endsWith('.svg'))
    .map(name => resolve(`${dir}/${name}`))
  return files || []
}

function slug (name, f=true) {
  name = name.substr(0, name.length - 4).replace(/\s+/g, '-')
  return f ? basename(name) : name
}


module.exports = {
  getSVGFiles,
  slug,
  BASE_PATH,
}
