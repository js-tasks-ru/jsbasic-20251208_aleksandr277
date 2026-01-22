import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value

    this.elem = this.render()

    this.thumb = this.elem.querySelector('.slider__thumb')
    this.progress = this.elem.querySelector('.slider__progress')
    this.valueElem = this.elem.querySelector('.slider__value')
    this.stepElems = this.elem.querySelectorAll('.slider__steps span')

    this.updateSlider()

    this.elem.addEventListener('click', this.onClick)
    this.thumb.addEventListener('pointerdown', this.onPointerDown)

    this.thumb.ondragstart = () => false
  }

  render() {
    const stepsHtml = Array.from({ length: this.steps }, (_, index) =>
      `<span ${index === this.value ? 'class="slider__step-active"' : ''}></span>`
    ).join('')

    return createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${stepsHtml}
        </div>
      </div>
    `)
  }

  onClick = (event) => {
    if (this.elem.classList.contains('slider_dragging')) return

    this.updateValueFromEvent(event, true)
    this.dispatchChange()
  }

  onPointerDown = (event) => {
    event.preventDefault()

    this.elem.classList.add('slider_dragging')

    document.addEventListener('pointermove', this.onPointerMove)
    document.addEventListener('pointerup', this.onPointerUp)
  }

  onPointerMove = (event) => {
    event.preventDefault()
    this.updateValueFromEvent(event)
  }

  onPointerUp = (event) => {
    this.elem.classList.remove('slider_dragging')

    document.removeEventListener('pointermove', this.onPointerMove)
    document.removeEventListener('pointerup', this.onPointerUp)

    this.updateValueFromEvent(event, true)
    this.dispatchChange()
  }

  updateValueFromEvent(event, isFinal = false) {
    const sliderRect = this.elem.getBoundingClientRect()

    let left = event.clientX - sliderRect.left
    let leftRelative = left / sliderRect.width

    if (leftRelative < 0) leftRelative = 0
    if (leftRelative > 1) leftRelative = 1

    const segments = this.steps - 1
    const approximateValue = leftRelative * segments
    const value = Math.round(approximateValue)

    this.value = value

    const leftPercents = isFinal
      ? (value / segments) * 100
      : leftRelative * 100

    this.thumb.style.left = `${leftPercents}%`
    this.progress.style.width = `${leftPercents}%`

    this.valueElem.textContent = value

    this.stepElems.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === value)
    })
  }

  updateSlider() {
    const segments = this.steps - 1
    const valuePercents = (this.value / segments) * 100

    this.thumb.style.left = `${valuePercents}%`
    this.progress.style.width = `${valuePercents}%`
    this.valueElem.textContent = this.value

    this.stepElems.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value)
    })
  }

  dispatchChange() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      })
    )
  }
}
