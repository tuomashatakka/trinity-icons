
import { overlay } from './views/OverlayView'
import { catalog } from './models/IconCatalog'
import { input } from './dom'
import { ACTION } from './constants'

const menu        = document.querySelector('#menu')
const observables = document.querySelectorAll('*[data-dispatch]')
const menuToggle  = menu.querySelector('.tri-arrow-left')
const toggleMenu  = () => menu.classList.toggle('open')

function onObservableChange (namespace) {
  let val = input.value(this)
  let [ cat, act ] = namespace
  let action = ACTION[act]
  action.call(this, val, cat)
}


function addListeners () {
  observables.forEach(element => {
    let fields    = element.querySelectorAll('input')
    let namespace = element.getAttribute('data-dispatch').split('.')
    let handler = function () { onObservableChange.call(this, namespace) }
    fields.forEach(field => {
      field.addEventListener('change', handler.bind(field))
      field.addEventListener('keyup', handler.bind(field))
  })})
  menuToggle.addEventListener('click', toggleMenu)
}

addListeners()
overlay()
catalog()

export {
  overlay,
  catalog,
}
