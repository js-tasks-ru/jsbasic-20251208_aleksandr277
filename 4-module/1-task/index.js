function makeFriendsList(friends) {
  const friendsUl = document.createElement('ul')

  friends.forEach(({ firstName, lastName }) => {
    const friendLi = document.createElement('li')
    friendLi.textContent = `${firstName} ${lastName}`
    friendsUl.appendChild(friendLi)
  })

  return friendsUl
}
