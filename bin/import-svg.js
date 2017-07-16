const { readFileSync, writeFileSync } = require('fs')
const { basename } = require('path')
const { getSVGFiles, BASE_PATH } = require('./utils')

let src    = '/Users/tuomas/Documents/Cloud/Creative Cloud Files/Resources/Icons/Duality/raster/trinity-2017-07' || process.argv[2] || BASE_PATH
let files  = getSVGFiles(src)

function processCSS (content) {
  content = content.replace(/class=\".*?\"/gi, '')
  content = content.replace(/style=\".*?fill: none.*?\"/gi, 'class="outline"')
  // content = content.replace(/style=\".*?fill: #333.*?\"/gi, 'class="fill"')
  content = content.replace(/style=\".*?\"/gi, 'class="fill"')
  return content
}

for (let file of files) {
  let content = readFileSync(file, 'utf8')
  content     = processCSS(content)
  writeFileSync(BASE_PATH + '/' + basename(file), content)
}
