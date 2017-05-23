

let include_index = 0

const ACTION = {
  search:  value => catalog.query(value.trim()),
  variant: value => catalog.updateVariants(...value),
  stroke:  () => updatePreviewStyles(),
  color:   () => updatePreviewStyles(),
  size:    () => updatePreviewStyles(),
}
const PREVIEW_SIZE = {
  xsmall: '24px',
  small:  '48px',
  medium: '80px',
  large:  '160px',
  huge:   '320px',
}
const SIZE_FACTOR = {
  xsmall: 10,
  small:  8,
  medium: 6,
  large:  4,
  huge:   2,
}


function addStylesheet (name, selector, attr={}) {
  let element = document.querySelector(`style.${name}`) || document.createElement('style')
  let content = Object.keys(attr).map(key => `\t${key}: ${attr[key]} !important;`).join('\n')

  element.setAttribute('class', name)
  element.innerHTML = `${selector} {\n${content}\n}`
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

function toObject (collection) {
  return [...collection].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: valueOf(field) }), {})
}

function valueOf (el) {
  if ('checkbox' === el.type)
    return Array.from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
      .filter(el => el.checked)
      .map(el => el.value)
  if ('radio' === el.type)
    return Array.from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
      .find(el => el.checked).value
  else
    return el.value
}

function updatePreviewStyles () {
  let fields = document.querySelector('div[data-bind="preview"]').querySelectorAll('input')
  let attrs  = toObject(fields)
  let width  = PREVIEW_SIZE[attrs.width || 'medium']
  let factor = parseInt(SIZE_FACTOR[attrs.width]) / SIZE_FACTOR.huge

  attrs['width'] = width
  attrs['stroke-width'] = (attrs['stroke-width'] * factor) + 'px'
  addStylesheet('preview_style', 'icon-entry .icon', attrs)
}


let observables = document.querySelectorAll('*[data-dispatch]')
let menuToggle  = document.querySelector('#menu .tri-arrow-left')
// let fields  = document.querySelectorAll('input[data-bound="preview_style"]')
// let usspdatePreviewStyles = () => addStylesheet('preview_style', 'icon-entry svg.icon',
//   [...fields].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: field.value }), {}))
let onObservableChange = function (namespace) {
  let value = valueOf(this)
  let [ cat, act ] = namespace
  let action = ACTION[act]

  if (typeof action === 'function')
    return action.call(this, value, cat)
}

let toggleMenu = () => {
  document.querySelector('#menu').classList.toggle('open')
}

var overlay = new OverlayView()
var catalog = new IconCatalog()

observables.forEach(element => {
  let fields    = element.querySelectorAll('input')
  let namespace = element.getAttribute('data-dispatch').split('.')

  fields.forEach(field => {
    let handler = event => onObservableChange.call(field, namespace, event)

    field.addEventListener('change', handler)
    field.addEventListener('keyup', handler)
  })
})

menuToggle.addEventListener('click', toggleMenu)

// fields.forEach(field => field.addEventListener('change', updatePreviewStyles))
