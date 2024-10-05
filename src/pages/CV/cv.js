import { offLoader, onLoader } from '../../components/loader/loader'
import { message } from '../../components/messageCV/messageCV'
import { Api } from '../../utils/API/api'

import './cv.css'

export const CV = () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const CVContainer = document.createElement('div')
  CVContainer.classList.add('cv')

  const h1 = document.createElement('h1')
  h1.textContent = '¡Faltan algunos detalles en tu CV!'

  const form = document.createElement('form')
  const nameInput = document.createElement('input')
  const ageInput = document.createElement('input')
  const photoInput = document.createElement('input')
  const titlePhoto = document.createElement('h2')
  const button = document.createElement('button')

  photoInput.type = 'file'
  ageInput.type = 'number'
  nameInput.placeholder = 'Nombre'
  ageInput.placeholder = 'Edad'
  titlePhoto.textContent = 'Añade un avatar o una imagen (opcional)'
  button.textContent = 'Añadir mis datos al CV'

  const updateData = async (event) => {
    event.preventDefault()
    onLoader()
    const formData = new FormData()
    formData.append('name', nameInput.value)
    formData.append('age', ageInput.value)
    formData.append('photo', photoInput.files[0])

    const userId = localStorage.getItem('userId')
    const response = await Api(`/api/v1/users/${userId}`, 'PUT', formData, true)
    try {
      if (response === 'Error al actualizar el CV') {
        message({
          firstMessage: '¡Bienvenido a Teatrillados!',
          secondMessage:
            'Primero debes crearte un usuario para actualizar tu CV',
          buttonCV: 'Registrarme',
          navigation: '/sign-up'
        })
      } else {
        message({
          firstMessage: '¡Ya hemos actualizado tus datos!',
          secondMessage:
            'Te invitamos a que navegues en la web y conozcas nuestros castings',
          buttonCV: 'Ver todos los castings',
          navigation: '/'
        })
      }
    } catch (error) {
    } finally {
      offLoader()
    }
  }

  form.addEventListener('submit', updateData)

  app.append(CVContainer)
  CVContainer.append(form)
  form.append(h1, nameInput, ageInput, titlePhoto, photoInput, button)
}
