

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


let fields  = document.querySelectorAll('input[data-bound="preview_style"]')
let handler = e => addStylesheet('preview_style', 'icon-entry svg.icon',
  ([...fields].reduce((attr, field) => ({ ...attr, [field.getAttribute('name')]: field.value }), {})))

var navView = new NavigationView()
var catalog = new IconCatalog()


navView.appendTo('header')
fields.forEach(field => field.addEventListener('change', handler))
