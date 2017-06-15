
const { generateIconFont } = require("./webfont")
const { print } = require("./utils")

generateIconFont()
  .then(({ src, name, size, path }) => print(
    `
    Archive created from ${src}

    ------
    OUTPUT
    ------
    name: ${name}.zip
    size: ${size} bytes
    path: ${path}`))

  .catch((error) => print(
    'error',
    `
    ------
    FAILED
    ------
    details: ${error}`))
