import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value

    this.elem = this.render()
    this.updateSlider()

    this.elem.addEventListener('click', this.onClick)
  }

  render() {
    const stepsHtml = Array.from({ length: this.steps }, (_, index) => {
      return `<span ${index === this.value ? 'class="slider__step-active"' : ''}></span>`
    }).join('')

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
    const sliderRect = this.elem.getBoundingClientRect()
    const left = event.clientX - sliderRect.left
    const leftRelative = left / this.elem.offsetWidth

    const segments = this.steps - 1
    const approximateValue = leftRelative * segments
    const value = Math.round(approximateValue)

    this.value = value
    this.updateSlider()

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    )
  }

  updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb')
    const progress = this.elem.querySelector('.slider__progress')
    const valueElem = this.elem.querySelector('.slider__value')
    const steps = this.elem.querySelectorAll('.slider__steps span')

    const segments = this.steps - 1
    const valuePercents = this.value / segments * 100

    thumb.style.left = `${valuePercents}%`
    progress.style.width = `${valuePercents}%`

    valueElem.textContent = this.value

    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value)
    })
  }
}
