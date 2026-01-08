function toggleText() {
  const button = document.querySelector('.toggle-text-button')
  const text = document.querySelector('#text')

  button.onclick = () => text.hidden = !text.hidden
}
