

function elem (attr={}, ...children) {
  let type = attr.type || 'div'
  let el = document.createElement(type)

  for (let key in attr) {
    let val = attr[key]

    if (key === 'type')
      continue
    else if (key === 'content')
      el.innerHTML = val
    else if (key.startsWith('on'))
      el.addEventListener(key.substr(2), e => val.call(el, e))
    else
      el.setAttribute(key, val)
  }

  for (let child of children)
    el.appendChild(elem(child || {}, ...(child.children || [])))

  return el
}

function observeScroll (fnc) {
  let callback = (e) => fnc(e)
  let unbind = () => window.removeEventListener('scroll', callback)
  let bind = () => window.addEventListener('scroll', callback)

  bind()
  return unbind
}

const ICON_SIZES = ['xsmall', 'small', 'medium', 'large', 'huge']

class NavigationView {
  constructor () {
    this.iconSize = 'medium'
  }

  render () {
    const view = this
    return elem(

      { type: 'nav', },

      { type: 'a',
        class: 'size',
        content: "Medium size",
        onclick: function (e) {
          view.changeIconSize()
          this.setAttribute('data-size', view.iconSize)
          this.innerHTML = `${view.iconSize} size` }},

      { type: 'section',
        class: 'grp variant',
        children: [

          { type: 'a',
            class: 'active',
            content: "Outline",
            onclick: function (e) {
              catalog.toggleVariant('outline')
              this.classList.toggle('active')
            }},

          { type: 'a',
            class: 'active',
            content: "Regular",
            onclick: function (e) {
              catalog.toggleVariant('regular')
              this.classList.toggle('active')
            }},

          { type: 'a',
            class: 'active',
            content: "Filled",
            onclick: function (e) {
              catalog.toggleVariant('filled')
              this.classList.toggle('active')
            }},
        ]
      },
      { type: 'input',
        placeholder: 'Search',
        onkeyup: function () {
          let value = this.value.trim()
          catalog.query(value) }},

      { type: 'a',
        class: 'tri tri-flat-landscape-outline',
        onclick: () => this.togglePreviewStyleEdit() },
    )
  }

  get element () {
    return this._element || (this._element = this.render())
  }

  togglePreviewStyleEdit () {
    document
      .querySelector('#preview')
      .classList
      .toggle('hidden')
  }

  changeIconSize () {
    let iconSize  = ICON_SIZES.indexOf(this.iconSize) + 1
    iconSize      = (iconSize >= ICON_SIZES.length) ? 0 : iconSize
    this.iconSize = ICON_SIZES[iconSize]
    document
      .querySelector('#icons')
      .setAttribute('data-size', this.iconSize)
  }

  appendTo (root) {
    document
      .querySelector(root)
      .appendChild(this.element)
    // this.element.parentElement.style.setProperty('height',
    //   this.element.parentElement.offsetHeight + this.element.offsetHeight + 'px')
    let y = this.element.offsetTop
    let callback = () => document.body.classList.toggle('fixed-header', window.scrollY > y)
    observeScroll(callback)
  }

}
