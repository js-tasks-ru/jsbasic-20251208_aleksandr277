import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0

    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_left">
          <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this._renderSlides()}
        </div>

        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>
      </div>
    `)

    this.inner = this.elem.querySelector('.carousel__inner')
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left')
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right')

    this._updateArrows()
    this._addEventListeners()
  }


  _renderSlides() {
    return this.slides.map(slide => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img
          src="../../assets/images/carousel/${slide.image}"
          class="carousel__img"
          alt="slide"
        >
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('')
  }

  _addEventListeners() {
    this.arrowRight.addEventListener('click', () => this._moveRight())
    this.arrowLeft.addEventListener('click', () => this._moveLeft())

    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button')
      if (!button) return

      const slide = button.closest('.carousel__slide')
      const id = slide.dataset.id

      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }))
    })
  }

  _moveRight() {
    if (this.currentSlide === this.slides.length - 1) return

    this.currentSlide++
    this._updatePosition()
  }

  _moveLeft() {
    if (this.currentSlide === 0) return

    this.currentSlide--
    this._updatePosition()
  }

  _updatePosition() {
    const offset = -this.currentSlide * this.inner.offsetWidth
    this.inner.style.transform = `translateX(${offset}px)`
    this._updateArrows()
  }

  _updateArrows() {
    this.arrowLeft.style.display =
      this.currentSlide === 0 ? 'none' : ''

    this.arrowRight.style.display =
      this.currentSlide === this.slides.length - 1 ? 'none' : ''
  }
}
