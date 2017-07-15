
import { setPreviewStyle, loadStyle, save, load, appendTemplate, notify } from '../utils'
import include, { read } from './Loader'

let _catalog

export const defaultIconProvider = {

  get: function () {
    let { container } = this

    return new Promise(resolve => {

      include('icons.svg')
      .then(resp => {

        let symbols = [...resp.children]
        let icons   = symbols
          .filter(sym => (
            !sym.getAttribute('id').startsWith('flat-') &&
            !sym.getAttribute('id').startsWith('_.') ))
          .map(sym => symbolToIconElement(sym, container))

        resolve(icons)
        return icons
      })})},

  data: function () {
    return new Promise(resolve => {
      read('icon_stats.json', resp => {
        let data
        try {
          data = JSON.parse(resp)
        } catch (e) {
          data = {}
        } finally {
          resolve(data)
        }
        return data
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
    this._icon_stats       = {}
    this.activeFilters     = [ FILTER.VARIANT, FILTER.QUERY, ]
    this.displayedVariants = variants
    this.queryTerm         = ''
    this.container         = document.querySelector('#icons')

    provider.data.call(this).then(content =>
      this._icon_stats = content)

    provider.get.call(this).then(content => {
      this._icons = content
      this.updateVariants(...variants)
      setPreviewStyle(loadStyle()) })

    this.orderBy = this.orderBy.bind(this)
  }

  getAllIcons () {
    return [ ...this.container.children ]
  }

  getIconMeta (name) {
    return this._icon_stats[name] || {}
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
    allIcons.forEach(icon => icon.toggle(this.icons.indexOf(icon) === -1))
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

  orderBy (order) {
    let allIcons = [ ...this.getAllIcons() ]
    let reversed = (this.order == order + ' asc')
    let details  = this._icon_stats
    this.order   = order + (reversed ? ' desc' : ' asc')

    save('order', { order: this.order })
    notify('sorting icons', this.order)
    allIcons.sort((a, b) => sortBy(details[a.title], details[b.title], { order, reversed }))
    allIcons.forEach(item => this.container.appendChild(item))
  }
}

export const catalog = () => _catalog || (_catalog = new IconCatalog())

function sortBy (a, b, { order, reversed }) {
  let cm =
    (order === 'alphabetically') ? 'name' :
    (order === 'by variant') ? 'variant' :
    (order === 'by category') ? 'path' :
    (order === 'by date') ? 'date' :
    'title'
  let arg = reversed ? [ cm, b, a ] : [ cm, a, b ]
  return cmp(...arg)
}

function cmp (prop, a, b) {
  a = a[prop] || a
  b = b[prop] || b
  if (a && a > b) return 1
  else if (b && a < b) return -1
  return 0
}

function symbolToIconElement (symbol, container) {

  let template  = 'icon'
  let title     = symbol.getAttribute('id')
  let icon      = title
  let code      = '\\U911'
  let data      = { title, icon, code }

  return appendTemplate({ template, container, data })
}
