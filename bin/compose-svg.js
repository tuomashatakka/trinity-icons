const { readFileSync, readdirSync, createWriteStream } = require("fs")
const { resolve } = require("path")
const { slug, BASE_PATH } = require('./utils')

function getSVGFiles (dir) {
  let files = readdirSync(dir)
    .filter(name => name.endsWith('.svg'))
  return files || []
}

function read (name) {
  let path = resolve(`${BASE_PATH}/${name}`)
  let content = ''
  let viewBox = [0, 0, 128, 128]
  try {
    content   = readFileSync(path, 'utf8')
  }
  finally {
    let start = content.search('</title>') + 8
    let end   = content.search('</svg>')
    content.replace(/viewBox\=[\"\'](.+?\d+)[\"\']/, (_, val) => {
      viewBox = val // .trim().split(/\s+/).map(n => parseInt(n))
    })
    content   = content.substr(start, end - start)

    return wrapSymbol({ name, content, viewBox })
  }
}

function wrapSymbol ({ name, content, viewBox }) {
  return `
  <symbol
   id='${slug(name, false)}'
   viewBox='${viewBox}'>
    ${content}
  </symbol>

  `
}

function readAll ({ src, dst }) {
  let stream = createWriteStream(dst)
  let files  = getSVGFiles(src)

  stream.write(`<svg xmlns="http://www.w3.org/2000/svg">\n`)
  for (let file of files) {
    stream.write(read(file))
  }
  stream.write(`</svg>\n`)
  stream.end()
}

function generateJSON({ src, dst }) {
  let stream = createWriteStream(dst)
  let files  = getSVGFiles(src)
  stream.write(`var icons = [\n`)
  for (let file of files) {
    let comma    = file == files[files.length-1] ? '' : ', '
    let contents = `"${slug(file)}"${comma}\n`
    stream.write(contents)
  }
  stream.write(`]\n`)
  stream.end()
}

readAll({
  src: BASE_PATH, dst: 'src/icons.svg' })
generateJSON({
  src: BASE_PATH, dst: 'src/icons.js' })