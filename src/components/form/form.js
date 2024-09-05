import './form.css'

export const createForm = ({ formClass, title, buttonText, funcion }) => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const formContainer = document.createElement('div')
  formContainer.classList.add(formClass)

  const h1 = document.createElement('h1')
  const form = document.createElement('form')
  const userNameInput = document.createElement('input')
  const passwordInput = document.createElement('input')
  const button = document.createElement('button')

  h1.textContent = title

  passwordInput.type = 'password'

  userNameInput.placeholder = 'Usuario'
  passwordInput.placeholder = 'Contraseña'
  button.textContent = buttonText

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('probando')
    funcion(userNameInput.value, passwordInput.value)
  })

  app.appendChild(formContainer)
  formContainer.append(form)
  form.append(h1, userNameInput, passwordInput, button)
}
