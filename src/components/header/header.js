import { routes } from '../../utils/routes/routes'
import './header.css'

export const createHeader = async () => {
  const header = document.querySelector('header')
  header.classList.add('header')
  header.innerHTML = ''

  const nav = document.createElement('nav')
  const rol = localStorage.getItem('userRol')
  for (const route of routes) {
    if (route.text === 'Añadir Casting') {
      if (rol === 'admin') {
        const addCastingItem = document.createElement('a')
        addCastingItem.textContent = 'Añadir Casting'
        addCastingItem.href = route.path

        addCastingItem.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })

        nav.appendChild(addCastingItem)
      }
    } else if (route.text === 'Sign up') {
      if (!localStorage.getItem('token')) {
        const signUpItem = document.createElement('a')
        signUpItem.textContent = 'Sign up'
        signUpItem.href = route.path

        signUpItem.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })

        nav.appendChild(signUpItem)
      }
    } else {
      const item = document.createElement('a')
      item.innerText = route.text
      item.href = route.path

      if (route.text === 'Login' && localStorage.getItem('token')) {
        item.textContent = 'Logout'
        item.addEventListener('click', (e) => {
          e.preventDefault()
          localStorage.clear()
          createHeader()
          navigateTo('/login')
        })
      } else {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })
      }

      nav.appendChild(item)
    }
  }

  header.appendChild(nav)
}

export const navigateTo = (path) => {
  const route = routes.find((route) => route.path === path)
  if (route) {
    if (route.text === 'Añadir Casting') {
      const rol = localStorage.getItem('userRol')
      if (rol === 'admin') {
        history.pushState({}, '', path)
        route.page()
      } else {
        alert('No tienes permisos para acceder a esta página.') // Mensaje de advertencia
      }
    } else {
      history.pushState({}, '', path)
      route.page()
    }
  }
}
