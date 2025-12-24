function highlight(table) {
  const rows = table.querySelectorAll('tbody tr')

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const cells = rows[i].cells

    const age = Number(cells[1].textContent)
    const gender = cells[2].textContent
    const status = cells[3]


    if (status.hasAttribute('data-available')) {
      status.getAttribute('data-available') === 'true' ?
        row.classList.add('available') :
        row.classList.add('unavailable')
    } else {
      row.hidden = true
    }

    if (gender === 'm') {
      row.classList.add('male')
    } else if (gender === 'f') {
      row.classList.add('female')
    }

    if (age < 18) row.style.textDecoration = 'line-through'

  }
}
