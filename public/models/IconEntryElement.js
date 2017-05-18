(function () {
'use strict';

const ICON_VARIANTS = [
  'default',
  'outline',
  'filled',
]

function register (key, setter, getter) {
  let el = this.querySelector('.' + key) || this.firstElementChild
  setter = setter || ((el, val) => { el.textContent = val })
  getter = getter || ((el) => el.textContent)

  this.__defineSetter__(key,
    (val) => { setter.call(this, el, val) })

  this.__defineGetter__(key,
    () => getter.call(this, el))

}

class IconElement extends HTMLElement {
  attachedCallback () {
    register.call(this, 'title')
    register.call(this, 'code')
    register.call(this, 'icon',
      (el, val) => el.innerHTML = `<svg-icon name='${val}'></svg-icon>`,
      (el) => el.getAttribute('name'))
  }
}

class SVGIconElement extends HTMLElement {

  get displayName () {
    let parts = (this.name || '').split('-')
    if (parts[0] === 'flat')
      parts.shift()
    return parts.join(' ').replace(/\s(\w)/g, (_, char) => char.toUpperCase())
  }

  get variant () {
    let parts = (this.name || '').split('-')
    let last = parts[parts.length - 1]
    return ICON_VARIANTS.indexOf(last.toLowerCase()) > -1 ? last : 'default'
  }

  attachedCallback () {
    this.name = this.getAttribute('name')
    this.innerHTML = `<svg class='icon style-${this.variant}' name='${this.name}'><use href='icons.svg#${this.name}' /></svg>`
  }
}

document.registerElement('icon-entry', IconElement);
document.registerElement('svg-icon', SVGIconElement);

})()
