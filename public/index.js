

// let include_index = 0
//
//
// function read (path, success) {
//   let { origin } = location
//   let src = path[0] === '/' ? path.substr(1) : path
//
//   return fetch([ origin, src ].join('/'))
//     .then(response => response.text())
//     .then(content => (success(content, src) || true) ? content : '')
// }
//
// function include (path) {
//
//   const append = (content, name) => {
//     let temp       = document.body.appendChild(document.createElement('div'))
//     let origin     = name.replace(/[^\w]+/gi, '-')
//
//     temp.innerHTML = content
//
//     Array.from(document.body.children).forEach(child =>
//       child.getAttribute('data-origin') === origin ? child.remove() : null)
//
//     temp.setAttribute('data-import', include_index++)
//     temp.setAttribute('data-origin', origin)
//     // temp.childNodes.forEach(child => {
//     //   if (!child.setAttribute) {
//     //     let { data } = child
//     //     child = document.createElement('div')
//     //     child.innerHTML = data
//     //   }
//     //
//     //   child.setAttribute('data-import', include_index++)
//     //   child.setAttribute('data-origin', origin)
//     //   document.body.appendChild(child)
//     // })
//     return true
//   }
//
//   return read(path, append)
// }
