import { offLoader, onLoader } from '../../components/loader/loader'
import { Api } from '../../utils/API/api'
import './nuevoCasting.css'

export const nuevoCasting = () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const newCastingContainer = document.createElement('div')
  newCastingContainer.classList.add('newCasting')

  const h1 = document.createElement('h1')
  h1.textContent = '¡Añade un nuevo casting para los aspirantes!'

  const form = document.createElement('form')
  const performanceInput = document.createElement('input')
  const dateInput = document.createElement('input')
  const placeInput = document.createElement('input')
  const photo = document.createElement('input')
  const titlePhoto = document.createElement('h2')
  const button = document.createElement('button')

  performanceInput.required = true
  dateInput.required = true
  placeInput.required = true
  photo.required = true
  photo.type = 'file'

  performanceInput.placeholder = 'Título obra'
  dateInput.placeholder = 'Fecha casting'
  placeInput.placeholder = 'Lugar casting'
  titlePhoto.textContent = 'Añade la imagen de la obra'
  button.textContent = 'Añadir nuevo casting'

  const addCasting = async (event) => {
    event.preventDefault()
    onLoader()
    const formData = new FormData()
    formData.append('performance', performanceInput.value)
    formData.append('city', placeInput.value)
    formData.append('date', dateInput.value)
    formData.append('img', photo.files[0])

    const response = await Api('/api/v1/castings', 'POST', formData, true)

    try {
      const response = await Api('/api/v1/castings', 'POST', formData)

      if (response === 'No hemos podido crear un nuevo casting') {
        alert('Error al añadir el casting:')
      } else {
        alert(
          'Hemos añadido el nuevo casting ¡Échale un ojo en la página Castings!'
        )
      }
    } catch (error) {
      console.error('Error en la API:', error)
    } finally {
      offLoader()
    }
  }

  form.addEventListener('submit', addCasting)

  form.append(
    h1,
    performanceInput,
    dateInput,
    placeInput,
    titlePhoto,
    photo,
    button
  )

  newCastingContainer.append(form)
  app.append(newCastingContainer)
}
