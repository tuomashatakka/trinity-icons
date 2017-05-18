(function () {
'use strict';


function overrideLinkClickHandler (el) {
  let href = '#' + el.getAttribute('href')
  if (href === '#all')
    href = 'index.html'
  el.addEventListener('click', e => {
    history.pushState({}, null, href)
    e.preventDefault()
    return false
  })
}

function elem (attr={}, ...children) {
  let type = attr.type || 'div'
  let el = document.createElement(type)

  for (let key in attr) {
    let val = attr[key]

    if (key === 'content')
      el.innerHTML = val
    else if (key.startsWith('on'))
      el.addEventListener(key.substr(2), e => val(e))
    else
      el.setAttribute(key, val)
  }

  for (let child of children)
    el.appendChild(elem(child || {}, ...(child.children || [])))

  return el
}


document
  .querySelectorAll('nav a')
  .forEach(overrideLinkClickHandler)

})()
