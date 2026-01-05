function initCarousel() {

  let currentSlide = 0

  const arrowLeft = document.querySelector('.carousel__arrow_left')
  const arrowRight = document.querySelector('.carousel__arrow_right')
  const carouselInner = document.querySelector('.carousel__inner')
  const totalSlides = document.querySelectorAll('.carousel__slide').length

  updateArrow()

  arrowLeft.addEventListener('click', () => {
    currentSlide--
    slideTransform()
  })

  arrowRight.addEventListener('click', () => {
    currentSlide++
    slideTransform()
  })

  function slideTransform() {
    // carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`
    carouselInner.style.transform = `translateX(-${currentSlide * carouselInner.offsetWidth}px)`;
    updateArrow()
  }

  function updateArrow() {
    arrowLeft.style.display = currentSlide === 0 ? 'none' : ''
    arrowRight.style.display = currentSlide === totalSlides - 1 ? 'none' : ''
  }
}
