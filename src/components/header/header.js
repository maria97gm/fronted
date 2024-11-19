import { routes } from '../../utils/routes/routes'
import { verifyToken } from '../authHeader/auth'
import './header.css'

export const createHeader = async () => {
  const header = document.querySelector('header')
  header.classList.add('header')
  header.innerHTML = ''

  const nav = document.createElement('nav')

  let isAuthenticated = false
  try {
    isAuthenticated = await verifyToken()
  } catch (error) {
    isAuthenticated = false 
  }

  const rol = localStorage.getItem('userRol')
  for (const route of routes) {
    if (route.text === 'Mis castings') {
      const item = document.createElement('a')
      item.textContent = 'Mis castings'
      item.href = route.path
      item.addEventListener('click', (e) => {
        e.preventDefault()
        navigateTo(route.path)
      })
      nav.appendChild(item)
    } else if (route.text === 'CV') {
      if (isAuthenticated) {
        const item = document.createElement('a')
        item.textContent = 'CV'
        item.href = route.path
        item.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })
        nav.appendChild(item)
      }
    } else if (route.text === 'Añadir Casting') {
      if (isAuthenticated && rol === 'admin') {
        const item = document.createElement('a')
        item.textContent = 'Añadir Casting'
        item.href = route.path
        item.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })
        nav.appendChild(item)
      }
    } else if (route.text === 'Login') {
      if (!isAuthenticated) {
        const item = document.createElement('a')
        item.textContent = 'Login'
        item.href = route.path
        item.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })
        nav.appendChild(item)
      } else {
        const item = document.createElement('a')
        item.textContent = 'Logout'
        item.href = '#'
        item.addEventListener('click', (e) => {
          e.preventDefault()
          localStorage.clear() 
          createHeader() 
          navigateTo('/login') 
        })
        nav.appendChild(item)
      }
    } else if (route.text === 'Sign up') {
      if (!isAuthenticated) {
        const item = document.createElement('a')
        item.textContent = 'Sign up'
        item.href = route.path
        item.addEventListener('click', (e) => {
          e.preventDefault()
          navigateTo(route.path)
        })
        nav.appendChild(item)
      }
    } else {
      const item = document.createElement('a')
      item.textContent = route.text
      item.href = route.path
      item.addEventListener('click', (e) => {
        e.preventDefault()
        navigateTo(route.path)
      })
      nav.appendChild(item)
    }
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
