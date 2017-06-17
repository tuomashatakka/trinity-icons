
export default class Icon {

  constructor(element) {
    this.props   = {}
    this.element = element
  }

  get name () {
    return this.props.name
  }

  get svg () {
    return this.element.querySelector('svg-icon')
  }

  get variant () {
    return this.svg.variant
  }
}
