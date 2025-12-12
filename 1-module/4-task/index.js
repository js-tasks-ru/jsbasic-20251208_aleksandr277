function checkSpam(str) {
  // ваш код...
  const spamList = [
    '1xBet',
    'XXX'
  ]

  return spamList.some(item => str.toLowerCase().includes(item.toLowerCase()))
}
