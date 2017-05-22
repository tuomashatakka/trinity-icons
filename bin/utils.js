
const { writeFileSync, readFileSync, readdirSync } = require("fs")
const { resolve, basename, join } = require("path")


const ROOT_PATH   = resolve(__dirname + '/../')
const PUBLIC_PATH = resolve(ROOT_PATH + '/public')
const ASSETS_PATH = resolve(ROOT_PATH + '/assets')
const BASE_PATH   = resolve(ROOT_PATH + '/assets/icons')
const LIB_PATH    = resolve(ROOT_PATH + '/assets/lib')

const INDEX_FILE_PATH = join(PUBLIC_PATH, 'index.html')


function getSVGFiles (dir=BASE_PATH) {
  let files = readdirSync(resolve(dir))
    .filter(name => name.endsWith('.svg'))
    .map(name => resolve(`${dir}/${name}`))
  return files || []
}


function readHTMLFile (name) {
  let path    = resolve(`${PUBLIC_PATH}/${name}`)
  let content = ''
  try {
    content   = readFileSync(path, 'utf8')
  }
  finally {
    let start = content.search('<body>') + 6
    let end   = content.search('</body>')
    content   = content.substr(start, end - start)
    return wrapSymbol({ name, content, start, end })
  }
}


function appendToHTMLFile (name, html) {
  let path    = resolve(`${PUBLIC_PATH}/${name}`)
  let content = ''
  console.log(path)
  try {
    content   = readFileSync(path, 'utf8')
  }
  finally {
    let pos   = content.search('</body>')
    let out   = [
      content.substr(0, pos), '',
      html.replace('\n', '\n    '),
      '  ' + content.substr(pos)
      ].join('\n')
    console.log("html<<<", html)
    console.log("content>>>",content)
    console.log("out>>>", out)
    writeFileSync(path, out)
  }
}


function getHTMLFragments (file) {
  let path    = resolve(file)
  let content = ''
  try {
    content   = readFileSync(path, 'utf8')
  }
  finally {
    let pos   = content.search('</body>')
    return [ content.substr(0, pos), '  ' + content.substr(pos) ]
  }
}


function slug (name, f=true) {
  name = name.substr(0, name.length - 4).replace(/\s+/g, '-')
  return f ? basename(name) : name
}


module.exports = {
  getSVGFiles,
  appendToHTMLFile,
  readHTMLFile,
  getHTMLFragments,
  slug,

  LIB_PATH,
  BASE_PATH,
  ROOT_PATH,
  PUBLIC_PATH,
  ASSETS_PATH,
  INDEX_FILE_PATH,
}
