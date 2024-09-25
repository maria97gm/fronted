import { routes } from '../../utils/routes/routes'
import './header.css'

export const createHeader = () => {
  const header = document.querySelector('header')
  header.classList.add('header')
  header.innerHTML = ''

  const nav = document.createElement('nav')

  for (const route of routes) {
    const item = document.createElement('a')
    item.innerText = route.text
    item.href = route.path

    item.addEventListener('click', (e) => {
      e.preventDefault()
      navigateTo(route.path)
    })

    nav.appendChild(item)
  }
  header.appendChild(nav)
}

export const navigateTo = (path) => {
  const route = routes.find((route) => route.path === path)
  if (route) {
    history.pushState({}, '', path)
    route.page()
  }
}
