

let include_index = 0
const ICON_CODES = {
  kakka:  'e003',
  pissa:  'e004',
  note:   'e005',
}


function addStylesheet (name, selector, attr={}) {
  let element = document.querySelector(`style.${name}`) || document.createElement('style')
  let content = Object.keys(attr).map(key => `\t${key}: ${attr[key]} !important;`).join('\n')

  element.setAttribute('class', name)
  element.innerHTML = `${selector} {\n${content}}`
  document.body.appendChild(element)
}


function read (path, success) {
  let { origin } = location
  let src = path[0] === '/' ? path.substr(1) : path

  return fetch([ origin, src ].join('/'))
    .then(response => response.text())
    .then(content => (success(content, src) || true) ? content : '')
}

function include (path) {

  const append = (content, name) => {
    let temp       = document.body.appendChild(document.createElement('div'))
    let origin     = name.replace(/[^\w]+/gi, '-')

    temp.innerHTML = content

    Array.from(document.body.children).forEach(child =>
      child.getAttribute('data-origin') === origin ? child.remove() : null)

    temp.setAttribute('data-import', include_index++)
    temp.setAttribute('data-origin', origin)
    // temp.childNodes.forEach(child => {
    //   if (!child.setAttribute) {
    //     let { data } = child
    //     child = document.createElement('div')
    //     child.innerHTML = data
    //   }
    //
    //   child.setAttribute('data-import', include_index++)
    //   child.setAttribute('data-origin', origin)
    //   document.body.appendChild(child)
    // })
    return true
  }

  return read(path, append)
}


let fields  = document.querySelectorAll('input[data-bound="preview_style"]')
let handler = e => addStylesheet('preview_style', 'icon-entry svg.icon',
  [...fields].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: field.value }), {}))

var navView = new NavigationView()
var overlay = new OverlayView()
var catalog = new IconCatalog()
navView.appendTo('header')
fields.forEach(field => field.addEventListener('change', handler))
