function sumSalary(salaries) {
  // ваш код...
  let sum = 0

  for (const key in salaries) {
    const salary = salaries[key]

    if (typeof salary === 'number' && Number.isFinite(salary)) {
      sum += salary
    }
  }

  return sum
}
