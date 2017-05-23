
function constructOverlayElement (target) {

  let element = document.createElement('section')
  let closeEl = document.createElement('span')
  let bodyEl  = document.createElement('div')
  let content = document.createElement('div')

  closeEl.setAttribute('class', 'close tri tri-plus')
  closeEl.setAttribute('style', 'display: inline-block; transform: rotate(45deg)')
  content.setAttribute('class', 'content')
  element.setAttribute('class', 'overlay')
  bodyEl.setAttribute('class', 'body')

  bodyEl.appendChild(closeEl)
  bodyEl.appendChild(content)
  element.appendChild(bodyEl)

  return target.appendChild(element)
}

let loader
function showLoader (msg) {
  loader = loader || document.createElement('div')
  loader.innerHTML = msg ? msg : ''
  loader.classList.add('open')
  return loader
}

function hideLoader () {
  if (loader)
    loader.remove()
  return loader
}

export default class OverlayView {

  constructor (content) {
    this.element = constructOverlayElement(document.body.querySelector('main'))
    this.element
      .querySelector('.close')
      .addEventListener('click', () => this.hide())

    if (content)
      this.content = content
  }

  get contentElement () {
    let el = this.element.querySelector('.content')
    if (!el) {
      el = this.element.appendChild(document.createElement('div'))
      el.classList.add('content')
    }
    return el
  }

  toggleLoader (show=null) {

    this.element.classList.toggle('loading', show)

    if (this.element.classList.contains('loading')) {
      this.contentElement.remove()
      this.element.appendChild(showLoader('loading'))
    }
    else {
      hideLoader()
    }
  }

  set content (html) {

    const set = data => {
      this.toggleLoader(false)

      let content = this.contentElement
      if (typeof data === 'string')
        content.innerHTML = data
      else
        content.appendChild(data)
    }

    if (html.constructor.name === 'Promise') {
      this.toggleLoader(true)
      html.then(data => set(data))
    }
    else
      set(html)
  }

  get content () {
    return this.contentElement.innerHTML
  }

  get visible () {
    return this.element.classList.contains('open')
  }

  show (content) {
    if (content)
      this.content = content
    this.element.classList.add('open')
  }

  hide () {
    this.element.classList.remove('open')
    this.content = ''
  }

}
