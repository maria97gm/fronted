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
  })

  app.appendChild(formContainer)
  formContainer.append(form)
  form.append(h1, userNameInput, passwordInput, button)
}
