#!/usr/bin/env node

const { PUBLIC_PATH, ASSETS_PATH, ROOT_PATH } = require('./utils')

const exp    = require('express')
const server = exp()
const PUBLIC = process.argv[3] || PUBLIC_PATH
const ASSETS = process.argv[4] || ASSETS_PATH || PUBLIC
const PORT   = process.argv[2] || process.env.PORT || 3000

server.use('/trinity-icons', exp.static(PUBLIC))
server.use('/assets',        exp.static(ASSETS))
server.use('/styles',        exp.static(ROOT_PATH + '/styles'))
server.use('/nodes',         exp.static(ROOT_PATH + '/node_modules'))
server.use('/',              exp.static(PUBLIC))

server.listen(PORT, () => console.log('express dev server running on port %s, serving \nPublic: %s\nStatic: %s', PORT, PUBLIC, ASSETS))
