const { readFileSync, readdirSync, createWriteStream } = require("fs")
const { resolve, basename } = require("path")
const { slug, BASE_PATH, PUBLIC_PATH, getHTMLFragments } = require('./utils')

function getSVGFiles (dir) {
  let files = readdirSync(dir)
    .filter(name => name.endsWith('.svg'))
  return files || []
}

function readSVG (fullpath) {
  let path = resolve(fullpath)
  let name = basename(path)
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
   viewBox='${viewBox}'
   vector-effect="non-scaling-stroke">
    ${content.replace(/\s+id=[\"\'].*?[\"\']/gi, '')}
  </symbol>

  `
}

function readAll ({ src, dst }) {
  let stream = createWriteStream(dst)
  let files  = getSVGFiles(src)
  console.log(src, files) // FIXME: Remove


  stream.write(`<svg xmlns="http://www.w3.org/2000/svg">\n`)
  for (let file of files) {
    stream.write(readSVG(resolve(src + '/' + file)))
  }
  stream.write(`</svg>\n`)
  stream.end()
}

function appendToHTML ({ src, dst }) {

  let [ before, after ] = getHTMLFragments(dst)
  let stream = createWriteStream(dst)
  let files  = getSVGFiles(src)

  stream.write(before)
  stream.write(`<svg xmlns="http://www.w3.org/2000/svg">\n`)
  for (let file of files) {
    stream.write(readSVG(file))
  }
  stream.write(`</svg>\n`)
  stream.write(after)
  stream.end()
}

function writeArray (stream, name, items) {
  stream.write(`var ${name} = [\n`)
  for (let item of items) {
    let comma    = item == items[items.length - 1] ? '' : ', '
    let contents = `"${slug(item)}"${comma}\n`
    stream.write(contents)
  }
  stream.write(`]\n`)
}

function generateJSON({ src, dst }) {

  let stream  = createWriteStream(dst)
  let files   = getSVGFiles(src)
  let flatten = files.filter(name => name.startsWith('flat-'))
  let regular = files.filter(name => !name.startsWith('flat-'))

  writeArray(stream, 'icons', regular)
  writeArray(stream, 'icons_flattened', flatten)

  stream.end()
}


module.exports = {
  getSVGFiles,
  readSVG,
  wrapSymbol,
  appendToHTML,
  readAll,
  generateJSON,
}
