import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.render()
    this.initScroll()
    this.initCategorySelect()
  }

  render() {
    const links = this.categories.map(category => {
      return `
        <a href="#"
           class="ribbon__item ${category.id === '' ? 'ribbon__item_active' : ''}"
           data-id="${category.id}">
          ${category.name}
        </a>
      `
    }).join('')

    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="../../assets/images/icons/angle-icon.svg">
        </button>

        <nav class="ribbon__inner">
          ${links}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg">
        </button>
      </div>
    `)
  }


  initScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner')
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right')

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    })

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    })

    ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = ribbonInner.scrollLeft
      const scrollRight = ribbonInner.scrollWidth - scrollLeft - ribbonInner.clientWidth

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible')
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible')
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible')
      } else {
        arrowRight.classList.add('ribbon__arrow_visible')
      }
    })
  }

  initCategorySelect() {
    this.elem.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item')
      if (!item) return

      event.preventDefault()

      this.elem.querySelector('.ribbon__item_active')?.classList.remove('ribbon__item_active')

      item.classList.add('ribbon__item_active')

      this.elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        })
      )
    })
  }
}
