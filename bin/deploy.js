const { mkdirSync, existsSync } = require('fs')
const { ncp } = require('ncp')
const { join } = require("path")
const { generateIconFont, generateArchive } = require("./webfont")
const { readAll, generateJSON } = require('./svg')
const { BASE_PATH, ASSETS_PATH, PUBLIC_PATH } = require('./utils')
const PUBLIC_ASSETS_PATH = join(PUBLIC_PATH, 'assets')

if (!existsSync(PUBLIC_ASSETS_PATH))
  mkdirSync(PUBLIC_ASSETS_PATH)

readAll({
  src: BASE_PATH,
  dst: 'public/icons.svg' })

generateJSON({
  src: BASE_PATH,
  dst: 'public/icons.js' })

ncp(ASSETS_PATH, PUBLIC_ASSETS_PATH, err => {
  if (err) throw new Error('Assets directory could not be copied;', err)
  else {
    generateArchive('assets/icons', 'assets/icons')
    generateIconFont()
} })
