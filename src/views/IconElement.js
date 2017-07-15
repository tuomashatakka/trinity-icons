
import { cleanup, register, onclick } from '../utils'
import { catalog } from '../models/IconCatalog'
import { overlay } from './OverlayView'

export default class IconElement extends HTMLElement {

  attachedCallback () {
    onclick.call(this, this.open)
    register.call(this, 'title')
    register.call(this, 'code')
    register.call(this, 'icon',
      (el, val) => el.innerHTML = `<svg-icon name='${val}'></svg-icon>`,
      (el) => el.getAttribute('name'))
  }

  get displayName () { return cleanup(this.details.title) }
  get svgLayer () {    return this.querySelector('svg-icon') }
  get category () {    return this.details.category }
  get variant () {     return this.svgLayer.variant }
  get visible () {     return !this.classList.contains('hidden') }
  get details () {     return getIconDetails(this.title) }

  toggle (state=null) {
    this.classList.toggle('hidden', state)
  }

  open () {
    overlay().show(descriptionForItem(this))
  }

}


function getIconDetails (name) {
  return catalog().getIconMeta(name)
}


function descriptionForItem (item) {
  let el            = document.createElement('article')
  let icon          = el.appendChild(document.createElement('div'))
  let iconContent   = item.svgLayer.cloneNode(true)
  let { details }   = item
  console.warn(details, '"!!"')

  const code = (type, content) => body.querySelector('code.' + type).textContent = content
  const addSection    = (titleText, content) => {
    let description   = el.appendChild(document.createElement('section'))
    let title         = description.appendChild(document.createElement('h2'))
    let body          = description.appendChild(document.createElement('div'))
    body.innerHTML    = content
    title.textContent = titleText
    return body
  }

  icon.classList.add('icon')
  icon.appendChild(iconContent)

  const body = addSection(item.displayName,
    `
    <section class='details'>
      <span class='tag'>Category ${item.category}</span>
      <span class='tag'>Variant ${item.variant}</span>
    </section>
    <h3>Use as SVG</h3>
    <code class='svg'></code>
    <ol>
      <li>Download and include the <a href='icons.svg'>trinity.svg</a> file in your project</li>
      <li>Either embed the file's contents inline in your document (allows you to refer to an icon by its name without the filename), or just refer to it by the svg use tag.</li>
      <li>Use the code above to draw the icon. The icon's appearance may be customized with css svg styles such as stroke-width, stroke and fill</li>
    </ol>

    <h3>Use as webfont</h3>
    <code class='font'></code>
    <ol>
      <li>Download the <a href='assets/iconfont.zip'>font files</a></li>
      <li>Include the font's css file in your document's head</li>
      <li>Use the code above to draw the icon</li>
    </ol>

    <h3>Use as image</h3>
    <code class='img'></code>
    `
  )

  code('svg',  `<svg><use href='trinity.svg#${item.title}' /></svg>`)
  code('img',  `<img src='trinity.svg#${item.title}' />`)
  code('font', `<i class='tri tri-${item.title}'></i>`)

  return el
}
