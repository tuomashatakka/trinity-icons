
const ICON_CODES = {
  kakka:  'e003',
  pissa:  'e004',
  note:   'e005',
}

function iconTemplate (title) {
  let template  = document.querySelector('template[data-name="icon"]')
  let container = document.querySelector('#icons')
  let icon      = title
  let code      = '\\' + ICON_CODES[title]
  let data      = { title, icon, code }

  appendTemplate({ template, container, data })
}

function appendTemplate ({ template, container, data }) {
  container = this != window ? this : container || document.body
  template  = document.importNode(template.content, true)
  template  = container.appendChild(template)

  for (let key of Object.keys(data))
    container.lastElementChild[key] = data[key]
}

const navView = new NavigationView()

navView.appendTo('header')
icons.forEach(iconTemplate)
