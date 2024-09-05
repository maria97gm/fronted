import { createForm } from '../../components/form/form'
import './login.css'

export const Login = () => {
  createForm({
    formClass: 'login',
    title: 'Inicia sesión en Teatrillados',
    buttonText: 'Iniciar sesión'
  })
}

// export const Login = () => {
//   const app = document.querySelector('#app')
//   app.innerHTML = ''

//   const loginContainer = document.createElement('div')
//   loginContainer.classList.add('login')

//   const h1 = document.createElement('h1')
//   const form = document.createElement('form')
//   const userNameInput = document.createElement('input')
//   const passwordInput = document.createElement('input')
//   const button = document.createElement('button')

//   h1.textContent = 'Inicia sesión en Teatrillados'

//   passwordInput.type = 'password'

//   userNameInput.placeholder = 'Usuario'
//   passwordInput.placeholder = 'Contraseña'
//   button.textContent = 'Iniciar sesión'

//   form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     console.log('probando')
//   })

//   app.appendChild(loginContainer)
//   loginContainer.append(form)
//   form.append(h1, userNameInput, passwordInput, button)
// }
