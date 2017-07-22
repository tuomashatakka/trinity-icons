'use babel'
const webfont  = require('webfonts-generator')
const archiver = require('archiver')
const { createWriteStream, mkdirSync, existsSync } = require("fs")
const { resolve } = require("path")
const { getSVGFiles, parseSVGFileMeta, slug } = require('./utils')

// create a file to stream archive data to.
function generateArchive (name, src) {
  let dst = resolve(`${name}.zip`)
  let output = createWriteStream(dst)
  let archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
  })
  return new Promise((resolve, reject) => {
    output.on('close', () => { resolve({ src, name, size: archive.pointer() / 1024, path: dst }) })
    archive.on('error', err => { reject(err) })
    archive.pipe(output)
    archive.directory(src)
    archive.finalize()
  })
}

function generateIconFont (dest='assets/font/', archiveDest='assets/iconfont') {

  let names  = []
  let rename = name => {
    let meta = parseSVGFileMeta(name)
    if (meta.variant === 'regular')
      name = meta.title
    else
      name = meta.title + '-' + meta.variant
    if (names.indexOf(name) > -1)
      name = meta.category + '-' + name
    names.push(name)
    console.log(name)
    return name
  }
  let files  = getSVGFiles()
    .map(parseSVGFileMeta)
    .filter(item => item.raster)
    .map(item => item.path)
  let fontName = 'trinity'
  let templateOptions = {
    classPrefix: 'tri-',
    baseSelector: '.tri'
  }

  return new Promise((resolve, reject) => {

    let errorCallback = error => reject(error)
    let successCallback = () => generateArchive(archiveDest, dest)
      .then(resolve)
      .catch(reject)

    if (!existsSync(dest))
      mkdirSync(dest)

    webfont({
      files,
      dest,
      fontName,
      templateOptions,
      rename },
      error => error ? errorCallback(error) : successCallback())
  })
}

module.exports = {
  generateIconFont,
  generateArchive,
}
