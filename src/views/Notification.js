
import { createElement } from '../dom'

const notificationContainer = document.body.appendChild(createElement('section'))
const NOTIFICATION_TIMEOUT = 3000
const _defaults = {
  html: true,
  persist: false
}

notificationContainer.setAttribute('class', 'notifications')


export default class Notification {

  constructor (...text) {

    this.element = notificationContainer.appendChild(createElement('article'))
    this.timeout = setTimeout(this.destroy.bind(this), NOTIFICATION_TIMEOUT)
    this.fadeTimeout = setTimeout(() => this.element.classList.add('fade'), NOTIFICATION_TIMEOUT - 500)
    this.html    = _defaults.html ? true : false
    this.text    = text.join(' ')

    if (_defaults.persist)
      this.persist()
  }

  set text (val) {
    if (this.html)
      return this.element.innerHTML = val || ''
    return this.element.textContent = val || ''
  }

  get text () {
    if (this.html)
      return this.element.innerHTML
    return this.element.textContent
  }

  persist () {
    clearTimeout(this.timeout)
    clearTimeout(this.fadeTimeout)
  }

  destroy () {
    this.element.remove()
  }
}
