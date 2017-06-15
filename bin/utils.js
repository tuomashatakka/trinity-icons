
const { readFileSync, readdirSync } = require("fs")
const { resolve, basename, join } = require("path")

const ROOT_PATH   = resolve(__dirname + '/../')

const PUBLIC_PATH = resolve(ROOT_PATH + '/public')

const ASSETS_PATH = resolve(ROOT_PATH + '/assets')

const BASE_PATH   = resolve(ROOT_PATH + '/assets/icons')

const LIB_PATH    = resolve(ROOT_PATH + '/assets/lib')

const INDEX_FILE_PATH = join(PUBLIC_PATH, 'index.html')

function print (...msg) {
  let message = msg.join("\n")

  // eslint-disable-next-line
  console.log(message)
  return message
}

function getSVGFiles (dir=BASE_PATH) {
  let files = readdirSync(resolve(dir))
    .filter(name => name.endsWith('.svg'))
    .map(name => resolve(`${dir}/${name}`))
  return files || []
}

function getHTMLFragments (file) {
  let content = ''
  let path    = resolve(file)
  let pos
  try { content = readFileSync(path, 'utf8') }
  finally { pos = content.search('</body>') }
  return [ content.substr(0, pos), '  ' + content.substr(pos) ]
}

function slug (name, f=true) {
  name = name.substr(0, name.length - 4).replace(/\s+/g, '-')
  return f ? basename(name) : name
}

function title (name) {

  const transforms = [

    // Remove extension
    str => str.replace(/\.[^\.]*$/, ''),

    // Remove path
    str => str.replace(/^.*\//, ''),

    // Transform the very first character to uppercase
    str => str[0].toUpperCase() + str.substr(1),

    // Truncate multiple spaces, replace dashes with spaces and transform first letter of each word to uppercase
    str => str.replace(/[^\w\d]+(.)/g, (_, char) => ' ' + char.toUpperCase()),
  ]

  return transforms.reduce((str, proc) => proc(str), name)
}

module.exports = {
  getSVGFiles,
  getHTMLFragments,
  print,
  title,
  slug,
  LIB_PATH,
  BASE_PATH,
  ROOT_PATH,
  PUBLIC_PATH,
  ASSETS_PATH,
  INDEX_FILE_PATH,
}
