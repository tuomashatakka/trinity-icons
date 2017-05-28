
import { setPreviewStyle, loadStyle, save, load, appendTemplate, notify } from '../utils'
import include from './Loader'

let _catalog

export const defaultIconProvider = {

  get: function () {
    let { container } = this

    return new Promise(resolve => {

      include('icons.svg')
      .then(resp => {

        let symbols = [...resp.children]
        let icons   = symbols
          .filter(sym => !sym.getAttribute('id').startsWith('flat-'))
          .map(sym    => symbolToIconElement(sym, container))

        resolve(icons)
        return icons
      })})},
}

export const FILTER = {
  OUTLINE: item => item.variant === 'outline',
  DEFAULT: item => item.variant === 'regular',
  FILLED: item => item.variant === 'filled',

  VARIANT: function (item) {
    return (this.displayedVariants.indexOf(item.variant) > -1)
  },
  QUERY: function (item) {
    let term = this.queryTerm
    return !term || (typeof item === 'string' ?
      item.search(term) > -1 : item.title ? item.title.search(term) > -1 :
      Object.keys(item).reduce((sum, itr) => sum || itr.search(term) > -1, false)
    )
  }
}


export default class IconCatalog {

  constructor (provider=defaultIconProvider) {
    let variants = load('filters').variants || [ 'regular' ]

    this._icons            = []
    this.activeFilters     = [ FILTER.VARIANT, FILTER.QUERY, ]
    this.displayedVariants = variants
    this.queryTerm         = ''
    this.container         = document.querySelector('#icons')

    if (typeof provider.get === 'function') {
      let provide = provider.get.call(this)

      if (provide.constructor.name === 'Promise')
        provide.then(content => {
          this._icons = content
          this.updateVariants(...variants)
          setPreviewStyle(loadStyle())
        })
      else {
        this._icons = provide
        this.updateVariants(...variants)
        setPreviewStyle(loadStyle())
      }
    }

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

  updateVariants (...variants) {
    this.displayedVariants = variants
    save('filters', { variants })
    this.update(true)
    return this.filter(...this.activeFilters)
  }

  toggleFilter (filter) {

    let index = this.activeFilters.findIndex(item => item.name ? item.name == filter.name : item == filter)

    if (index > -1)
      this.activeFilters.splice(index, 1)
    else {
      this.activeFilters.push(filter)
      // this.filter(...this.activeFilters)
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

  orderBy (term) {
    notify('sorting icons', term)
  }
}


export const catalog = () => _catalog || (_catalog = new IconCatalog())


function symbolToIconElement (symbol, container) {

  let template  = 'icon'
  let title     = symbol.getAttribute('id')
  let icon      = title
  let code      = '\\U911'
  let data      = { title, icon, code }

  return appendTemplate({ template, container, data })
}
