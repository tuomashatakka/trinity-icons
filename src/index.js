
import IconElement from './views/IconElement'
import SVGIconElement from './views/SVGIconElement'
import { overlay } from './views/OverlayView'
import { catalog } from './models/IconCatalog'
import { input } from './dom'
import { ACTION } from './constants'


const menu        = document.querySelector('#menu')
const observables = document.querySelectorAll('*[data-dispatch]')
const menuToggle  = menu.querySelector('.menu-toggle')
const toggleMenu  = () => menu.classList.toggle('open')


function onObservableChange (cat, act) {
  let val    = input.value(this)
  let action = ACTION[act]
  action.call(this, val, cat)
}


function addListeners () {
  observables.forEach(element => {
    let namespace = element.getAttribute('data-dispatch').split('.')
    let fields    = element.querySelectorAll('input')
    let handler   = function () { onObservableChange.call(this, ...namespace) }
    fields.forEach(field => {
      field.addEventListener('change', handler.bind(field))
      field.addEventListener('keyup', handler.bind(field))
  })})
  menuToggle.addEventListener('click', toggleMenu)
}


document.registerElement('icon-entry', IconElement)
document.registerElement('svg-icon', SVGIconElement)

addListeners()
overlay()
catalog()


export {
  overlay,
  catalog,
}
