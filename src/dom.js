/**
 * DOM Utility functions
 * @module dom
 */

const INPUT_TYPE_CHECKBOX = 'checkbox'
const INPUT_TYPE_RADIO    = 'radio'
const isCheckbox = ({ type }) => INPUT_TYPE_CHECKBOX === type
const isRadio    = ({ type }) => INPUT_TYPE_RADIO === type

export const input = {
  value: el => {

    if (isCheckbox(el))
      return Array
        .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
        .filter(el => el.checked)
        .map(el => el.value)

    if (isRadio(el)) {
      let match = Array
        .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
        .find(el => el.checked)
      return match ? match.value : null
    }

    return el.value
  }
}


export function assertElement (elem) {
  if (typeof type === 'string')
    return document.createElement(elem)
  return elem
}


export function createElement (elem='div', create=true) {

  if (typeof elem === 'string')
    return document.createElement(elem)

  if (typeof elem.cloneNode === 'function')
    return elem.cloneNode(true)

  return create ? document.createElement('div') : null
}


export function setElementContents (content='', html=true) {

  let element = assertElement(this)

  if (typeof content === 'string')
    element[html ? 'innerHTML' : 'textContent'] = content

  else if(content.appendChild)
    element.appendChild(content)

  else
    throw new Error('Trying to insert invalid content into an HTML element.')

  return element
}


export function getElementContents () {

  let targetElement = assertElement(this)

  return targetElement.childNodeCount > 0 ?
    [...targetElement.children] :
    targetElement.innerHTML
}


export function appendChildElement (elem) {
  let targetElement = assertElement(this)
  let insertElement = assertElement(elem)
  return targetElement.appendChild(insertElement)
}


export function attachBefore (elem) {
  let targetElement = assertElement(this)
  let insertElement = assertElement(elem)
  let { parentElement } = targetElement
  if (!parentElement) return null
  try { return parentElement.insertBefore(insertElement, targetElement) }
  catch (e) { return null }
}


export function attachAfter (elem) {
  let targetElement = assertElement(this)
  let insertElement = assertElement(elem)
  let { parentElement } = targetElement
  if (!parentElement) return null
  try { return parentElement.insertAfter(insertElement, targetElement) }
  catch (e) { return null }
}


export default function extendHTMLElementPrototype () {

  const elementPrototypeMethods = [
    attachBefore,
    attachAfter,
    appendChildElement,
    getElementContents,
    setElementContents, ]

  const globalMethods = [
    createElement,
    setElementContents, ]

  for (let method of elementPrototypeMethods)
    HTMLElement.prototype[method.name] = function () {
      return method.apply(this, arguments)
    }

  return Object.assign(
    window,
    globalMethods.reduce((r, c) => ({ ...r, [c.name]: c}), {})
  )

}


/**
 * Global exports
 */

// TODO: Move this for webpack to handle when exported as lib
window.edm = {
  create: createElement,
  html: function (el, ...args) {
    return !args.length ? getElementContents.call(el) :
    setElementContents.call(el, ...args)
  },
}
