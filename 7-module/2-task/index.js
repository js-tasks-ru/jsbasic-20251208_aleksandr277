import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render()
    this.onEscKeyDown = this.onEscKeyDown.bind(this)
  }

  render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button class="modal__close">
              <img src="../../assets/images/icons/cross-icon.svg">
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `)
  }

  open() {
    document.body.append(this.elem)
    document.body.classList.add('is-modal-open')

    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close())

    document.addEventListener('keydown', this.onEscKeyDown)
  }

  close() {
    this.elem.remove()
    document.body.classList.remove('is-modal-open')

    document.removeEventListener('keydown', this.onEscKeyDown)
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title
  }

  setBody(node) {
    const body = this.elem.querySelector('.modal__body')
    body.innerHTML = ''
    body.append(node)
  }

  onEscKeyDown(event) {
    if (event.code === 'Escape') this.close()
  }
}
