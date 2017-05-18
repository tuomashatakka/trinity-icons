

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

const ICON_SIZES = ['xsmall', 'small', 'medium', 'large', 'huge']

class NavigationView {
  constructor () {
    this.iconSize = 'small'
  }

  render () {
    const view = this
    return elem(
      {
        type: 'nav',
      },
      {
        type: 'a',
        content: "Lollersso",
        onclick: function (e) {
          view.changeIconSize()
          this.innerHTML = `${view.iconSize} size`
        }
      }
    )
  }

  get element () {
    return this._element || (this._element = this.render())
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
  }

}
