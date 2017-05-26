
import { PREVIEW_SIZE, SIZE_FACTOR } from './constants'
import { input } from './dom'


export function toObject (collection) {
  return [...collection].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: input.value(field) }), {})
}

// export function value (el) {
//
//   if (isCheckbox(el))
//     return Array
//       .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
//       .filter(el => el.checked)
//       .map(el => el.value)
//
//   if (isRadio(el)) {
//     let match = Array
//       .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
//       .find(el => el.checked)
//     return match ? match.value : null
//   }
//
//   return el.value
// }


export function addStylesheet (name, data) {

  let element = document.querySelector(`style.${name}`) || document.createElement('style')
  let css = ''

  for (let selector in data) {
    let attr = data[selector] || {}
    let content = Object.keys(attr).map(key => `\t${key}: ${attr[key]} !important;`).join('\n')
    css += `\n${selector} {\n${content}\n}`
  }

  element.setAttribute('class', name)
  element.innerHTML = css
  document.body.appendChild(element)
}


export function updatePreviewStyles () {

  let fields = document.querySelector('div[data-bind="preview"]').querySelectorAll('input')
  let attrs  = toObject(fields)
  let width  = PREVIEW_SIZE[attrs.width || 'medium']
  let factor = parseInt(SIZE_FACTOR[attrs.width]) / SIZE_FACTOR.huge

  attrs['width'] = width
  attrs['stroke-width'] = (attrs['stroke-width'] * factor) + 'px'
  addStylesheet('preview_style', { 'icon-entry .icon': attrs })
}
