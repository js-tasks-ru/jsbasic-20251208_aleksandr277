function camelize(str) {
  const arr = str.split('-')
  let result = ''
  arr.forEach((word, index) => index === 0 ?
    result += word :
    result += word[0].toUpperCase() + word.slice(1))
  return result
}
