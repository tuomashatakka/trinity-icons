
const INPUT_TYPE_CHECKBOX = 'checkbox'
const INPUT_TYPE_RADIO    = 'radio'

const isCheckbox = ({ type }) => INPUT_TYPE_CHECKBOX === type
const isRadio    = ({ type }) => INPUT_TYPE_RADIO === type


function toObject (collection) {
  return [...collection].reduce((attr, field) => Object.assign(attr, {[field.getAttribute('name')]: valueOf(field) }), {})
}


function valueOf (el) {

  if (isCheckbox(el))
    return Array
      .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
      .filter(el => el.checked)
      .map(el => el.value)

  if (isRadio(el)) {
    let match = Array
      .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
      .find(el => el.checked)
    return match ? match.value : null
  }

  return el.value
}
