
const defaultIconProvider = {
  get: () => [...window.icons].map(iconTemplate)
}

var FILTER = {
  OUTLINE: item => item.variant === 'outline',
  DEFAULT: item => item.variant === 'regular',
  FILLED: item => item.variant === 'filled',

  VARIANT: function (item) { return (this.displayedVariants.indexOf(item.variant) > -1) },
  QUERY: function (item) {
    let term = this.queryTerm
    return !term || (typeof item === 'string' ?
      item.search(term) > -1 : item.title ? item.title.search(term) > -1 :
      Object.keys(item).reduce((sum, itr) => sum || itr.search(term) > -1, false))
  }
}

function iconTemplate (title) {
  let template
  let name      = 'icon'
  let link      = document.querySelector(`link[rel="import"][href*="${name}.html"]`)

  if (link)
    template    = link.import.querySelector(`template[data-name="${name}"]`)
  else
    template    = document.querySelector(`template[data-name="${name}"]`)
  let container = document.querySelector('#icons')
  let icon      = title
  let code      = '\\' + title
  let data      = { title, icon, code }

  return appendTemplate({ link, template, container, data })
}


function appendTemplate ({ link, template, container, data }) {
  container = container || document.body

  if (link)
    template = document.importNode(template.content, true)

  if (template)
    template = container.appendChild(template)

  if (container.lastElementChild)
    for (let key of Object.keys(data))
      container.lastElementChild[key] = data[key]
  return container.lastElementChild
}

export default class IconCatalog {

  constructor (provider=defaultIconProvider) {

    this.displayedVariants = ['outline', 'regular', 'filled']
    this.activeFilters = [ FILTER.VARIANT, FILTER.QUERY, ]
    this.queryTerm = ''
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
    this.update(true)
  }

  query (q='', keep=false) {
    if (!keep)
      this.reset()
    this.queryTerm = q.trim().length ? new RegExp(q.replace(/([^\w]+)(?=\w+)/gi, '|'), 'gi') : ''
    return this.filter(...this.activeFilters)
  }

  toggleVariant (style) {
    this.toggleFilter(style, 'variant')
  }

  updateVariants (...variants) {
    this.displayedVariants = variants
    this.update(true)
    return this.filter(...this.activeFilters)
  }

  toggleFilter (filter, group=null) {

    let arr = {
      get: () => (group === 'variant') ? this.displayedVariants : this.activeFilters,
      add: item => (group === 'variant') ? this.displayedVariants.push(item) : this.activeFilters.push(item),
      remove: index => (group === 'variant') ? this.displayedVariants.splice(index, 1) : this.activeFilters.splice(index, 1),
    }
    let index = arr.get().findIndex(item => item.name ? item.name == filter.name : item == filter)
    if (index > -1)
      arr.remove(index)
    else {
      arr.add(filter)
      this.filter(...this.activeFilters)
      this.update(true)
    }

    return this.filter(...this.activeFilters)
  }

  filter (...fn) {
    this.icons = this.icons.filter(
      icon => fn.reduce(
        (sum, test) => sum && test.call(this, icon), true)
    )
    return this.icons
  }
}

let _catalog
export const catalog = () => _catalog || (_catalog = new IconCatalog())
