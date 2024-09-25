import { navigateTo } from '../header/header'
import './messageCV.css'

export const message = ({
  firstMessage,
  secondMessage,
  buttonCV,
  navigation
}) => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const CVContainer = document.createElement('div')
  CVContainer.classList.add('cvmessage')

  const h1 = document.createElement('h1')
  const h2 = document.createElement('h2')

  const button = document.createElement('button')

  h1.textContent = firstMessage
  h2.textContent = secondMessage
  button.textContent = buttonCV

  button.addEventListener('click', () => {
    navigateTo(navigation)
  })

  app.append(CVContainer)
  CVContainer.append(h1, h2, button)
}
