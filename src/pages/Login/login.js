import { createForm } from '../../components/form/form'
import { navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import './login.css'

export const Login = () => {
  createForm({
    formClass: 'login',
    title: 'Inicia sesión en Teatrillados',
    buttonText: 'Iniciar sesión',
    funcion: async (userName, password) => {
      const body = JSON.stringify({
        userName,
        password
      })
      const res = await Api('/api/v1/users/login', 'POST', body)
      return res
    },
    respuesta: 'Usuario o contraseña incorrecto',
    errorMessage: 'Usuario o contraseña incorrecto, inténtalo de nuevo',
    funcionExito: (res) => {
      localStorage.setItem('userId', res.user._id)
      localStorage.setItem('token', res.token)
      navigateTo('/')
    }
  })
  signUp()
}

const signUp = () => {
  const app = document.querySelector('#app')

  const divSignUp = document.createElement('div')
  divSignUp.classList.add('message')
  divSignUp.innerHTML = `
    <p>Si aun no tienes tu usuario creado, <a href="/sign-up" id="signUpLink">haz click aquí</a></p>
  `

  app.append(divSignUp)

  const signUpLink = document.querySelector('#signUpLink')
  signUpLink.addEventListener('click', (e) => {
    e.preventDefault()
    navigateTo('/sign-up')
  })
}
