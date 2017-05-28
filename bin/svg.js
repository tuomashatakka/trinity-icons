const { readFileSync, readdirSync, createWriteStream, stat, writeFile } = require("fs")
const { resolve, basename, dirname } = require("path")
const { slug, BASE_PATH, PUBLIC_PATH, getHTMLFragments } = require('./utils')

function getSVGFiles (dir) {
  let files = readdirSync(dir)
    .filter(name => name.endsWith('.svg'))
  return files || []
}

function readSVG (fullpath) {
  let path    = resolve(fullpath)
  let name    = basename(path)
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
    content   = wrapSymbol({ name, content, viewBox })
  }
  return content
}

function cleanup (content) {
  content = content.replace(/[\s\-]+(\w)/gi, (_, char) => ' ' + char.toUpperCase())
  content = content.replace(/\s+filled|\s+outline/gi, '')
  return content[0].toUpperCase() + content.substr(1)
}

function resolveVariant (name) {
  return name.search('-filled')  > -1 ? 'filled' :
         name.search('-outline') > -1 ? 'outline' :
         'regular'
}

function getStats ({ path, format='json' }) {
  let title = basename(path).split('.')[0]

  return new Promise(accept => {
    stat(resolve(path), (err, stats) => {
      if (err)
        throw new Error("Invalid stat read in", path)
      let name = title
      let variant = resolveVariant(name)
      let displayName = cleanup(title)
      let date = stats.ctime

      stats = { path, name, displayName, date, variant, }

      if (format === 'utf8')
        accept(JSON.stringify(stats, null, 2))

      else if (format === 'json')
        accept(stats)
    })
  })
}

function wrapSymbol ({ name, content, viewBox }) {
  return `
<symbol id='${slug(name, false)}' viewBox='${viewBox}'>
  ${content.replace(/\s+id=[\"\'].*?[\"\']/gi, '')}
</symbol>
`
}

function readAll ({ src, dst }) {

  let statsIter  = 0
  let statStream = createWriteStream(resolve(dirname(dst), 'icon_stats.json'))
  let stream     = createWriteStream(dst)
  let files      = getSVGFiles(src)

  stream.write(`<svg xmlns="http://www.w3.org/2000/svg">\n`)
  statStream.write(`{\n`)

  for (let file of files) {
    let path = resolve(src + '/' + file)

    stream.write(readSVG(path))
    getStats({ path, format: 'utf8' })
    .then(stats => {

      statStream.write(`"${file.split('.')[0]}": ${stats}`)
      if (++statsIter >= files.length) {
        statStream.write(`\n}\n`)
        statStream.end() }
      else statStream.write(`,\n`)
    })
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
  for (let file of files)
    stream.write(readSVG(file))
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
