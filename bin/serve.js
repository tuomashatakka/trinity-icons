#!/usr/bin/env node

const { PUBLIC_PATH } = require('./utils')
const express = require('express')
const devServer = express()

const PORT = process.argv[2] || process.env.PORT || 3000

let staticRoot = process.argv[3] || PUBLIC_PATH
devServer.use('/', express.static(staticRoot))
devServer.listen(PORT, () => console.log('express dev server running on port %s, serving %s', PORT, staticRoot))
