import { offLoader, onLoader } from '../loader/loader'
import './form.css'

export const createForm = ({
  formClass,
  title,
  buttonText,
  funcion,
  respuesta,
  errorMessage,
  funcionExito
}) => {
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
  userNameInput.required = true
  passwordInput.placeholder = 'Contraseña'
  passwordInput.required = true

  button.textContent = buttonText

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    onLoader()
    const minLoadTime = 3000 // Tiempo mínimo en milisegundos (1 segundo)

    try {
      const res = await funcion(userNameInput.value, passwordInput.value, form)

      const existingError = document.querySelector('.error-message')
      if (existingError) {
        existingError.remove()
      }

      if (res === respuesta) {
        const pError = document.createElement('p')
        pError.classList.add('error-message')
        pError.textContent = errorMessage
        form.appendChild(pError)
      } else {
        funcionExito(res)
      }
    } catch (error) {
    } finally {
      offLoader()
    }
  })

  app.appendChild(formContainer)
  formContainer.append(form)
  form.append(h1, userNameInput, passwordInput, button)
}
