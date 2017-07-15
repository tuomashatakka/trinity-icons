
import { ICON_VARIANTS } from '../constants'
import { cleanup } from '../utils'


export default class SVGIconElement extends HTMLElement {

  get displayName () {
    return cleanup(this.name)
  }

  get variant () {
    let parts = (this.name || '').split('-')
    let last  = parts[parts.length - 1]
    return ICON_VARIANTS.indexOf(last.toLowerCase()) > -1 ? last : 'regular'
  }

  attachedCallback () {
    let base  = ''
    this.name = this.getAttribute('name')
    this.innerHTML = `<svg class='icon style-${this.variant}' name='${this.name}'><use href='${base}#${this.name}' /></svg>`
  }
}
