
const defaultIconProvider = { get: () => [...icons].map(iconTemplate) }

function iconTemplate (title) {
  let template  = document.querySelector('template[data-name="icon"]')
  let container = document.querySelector('#icons')
  let icon      = title
  let code      = '\\' + ICON_CODES[title]
  let data      = { title, icon, code }

  return appendTemplate({ template, container, data })
}


function appendTemplate ({ template, container, data }) {
  container = this != window ? this : container || document.body
  template  = document.importNode(template.content, true)
  template  = container.appendChild(template)

  for (let key of Object.keys(data))
    container.lastElementChild[key] = data[key]

  return container.lastElementChild
}


let nav = document.querySelector('header')
let srchField = nav.appendChild(document.createElement('input'))

srchField.addEventListener('keyup', () => {
  let value = srchField.value.trim()
  catalog.query(value)
})


class IconCatalog {

  constructor (provider=defaultIconProvider) {

    this.container = document.querySelector('#icons')
    this._icons =
      typeof provider.get === 'function' ?
      [...provider.get()] : []
  }

  getAllIcons () {
    return [ ...this.container.children ]
  }

  set icons (val) {
    this._icons = val
    this.update()
  }

  get icons () {
    return this._icons
  }

  get iconNames () {
    return this.icons.map(icon => icon.title)
  }

  update (reset=false) {
    let allIcons = this.getAllIcons()
    if (reset)
      this._icons = allIcons

    allIcons.forEach(icon => this.icons.indexOf(icon) === -1 ? icon.classList.add('hidden') : icon.classList.remove('hidden'))
  }
  reset () {
    this._icons = this.getAllIcons()
  }

  query (q='', keep=false) {
    if (!keep)
      this.reset()
    let term = new RegExp(q.replace(/([^\w]+)(?=\w+)/gi, '|'))
    let flt = icon => typeof icon === 'string' ?
      icon.search(term) > -1 :
      icon.title ? icon.title.search(term) > -1 :
        Object.keys(icon).reduce((sum, itr) => sum || itr.search(term) > -1, false)
    return this.filter(flt)
  }

  filter (...fn) {
    this.icons = this.icons.filter(
      icon => fn.reduce(
        (sum, test) => sum && test(icon), true)
    )
    return this.icons
  }
}
