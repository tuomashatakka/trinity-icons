const webfont  = require('webfonts-generator')
const archiver = require('archiver')
const { readdirSync, createWriteStream, mkdirSync, rmdirSync, existsSync } = require("fs")
const { resolve } = require("path")
const { BASE_PATH, getSVGFiles, slug } = require('./utils')
// require modules

// create a file to stream archive data to.
function generateArchive (name, src) {
  let output = createWriteStream(resolve(`${name}.zip`))
  let archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
  })
 
 return new Promise(done => {
  output.on('close', () => {
    console.log('Archive size ' + archive.pointer() + ' bytes');
    console.log('Archiver file descriptor has closed.');
done()
  })

  archive.on('error', err => { throw err })
  archive.pipe(output)
  archive.directory(src)
  archive.finalize()
}) 
}

function generateIconFont (dest='assets/font/') {

  let rename = name => slug(name)
  let files = getSVGFiles()
  let fontName = 'trinity'
  let templateOptions = {
    classPrefix: 'tri-',
    baseSelector: '.tri'
  }

  let callback = error => error ?
    console.error('Failed to create webfont:', error) :
    generateArchive('assets/iconfont', dest)

  if (!existsSync(dest))
    mkdirSync(dest)
  webfont({ files, dest, fontName, templateOptions, rename }, callback)
}

module.exports = {
  generateIconFont,
  generateArchive,
}
