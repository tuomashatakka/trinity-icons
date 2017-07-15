
import { PREVIEW_SIZE, SIZE_FACTOR } from './constants'
import { input } from './dom'
import Notification from './views/Notification'


export function toObject (collection) {
  return [...collection].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: input.value(field) }), {})
}


export function listen (eventName, callback) {
  this.addEventListener(eventName, callback)
  return () => this.removeEventListener(eventName, callback)
}


export function onclick (callback) {
  return listen.call(this, 'click', callback)
}


export function cleanup (txt) {
  let parts = (txt || '').split('-')
  if (parts[0] === 'flat')
    parts.shift()
  return parts.join(' ').replace(/\s(\w)/g, (_, char) => char.toUpperCase())
}


export function register (key, setter, getter) {
  let el = this.querySelector('.' + key) || this.firstElementChild
  setter = setter || ((el, val) => { el.textContent = val })
  getter = getter || ((el) => el.textContent)

  this.__defineSetter__(key,
    (val) => { setter.call(this, el, val) })

  this.__defineGetter__(key,
    () => getter.call(this, el))
}


export function notify () {
  return new Notification(...arguments)
}
window.notify = notify


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
  let fields = document.querySelector('*[data-bind="preview"]').querySelectorAll('input')
  let attrs  = toObject(fields)
  setPreviewStyle(attrs)
}


export function setPreviewStyle (attrs={}) {

  if (typeof attrs !== 'object')
    return

  let width  = PREVIEW_SIZE[attrs.width || 'medium']
  let factor = parseInt(SIZE_FACTOR[attrs.width]) / SIZE_FACTOR.huge

  if (!attrs['stroke-width'])
    attrs['stroke-width'] = 1

  saveStyle(attrs)

  attrs['width'] = width
  attrs['stroke-width'] = parseFloat(attrs['stroke-width'] * factor/factor, 3) + 'px'
  addStylesheet('preview_style', { 'icon-entry .icon': attrs })
}


export function appendTemplate ({ link, template, container, data }) {

  let context = link ? link.import : document
  container = container || document.body
  container.appendChild(document.importNode(context.querySelector(`template[data-name='${template}']`).content, true))

  if (container.lastElementChild)
    for (let key of Object.keys(data))
      container.lastElementChild[key] = data[key]

  return container.lastElementChild
}


export const save = (key, attrs) => localStorage.setItem(`trinity-${key}`, JSON.stringify(Object.assign(load(key), attrs || {})))
export const load = (key)        => JSON.parse(localStorage.getItem(`trinity-${key}`) || '{}')

export const saveStyle = (attrs) => save('preview-styles', attrs)
export const loadStyle = ()      => load('preview-styles')
