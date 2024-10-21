import { navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import { castingsEmpty } from '../Castings/castings'
import './inicio.css'

export const Inicio = async () => {
  const castings = await Api('/api/v1/castings')
  printCastings(castings)
}

export const printCastings = (castings, isMyCastingsPage = false) => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const castingsContainer = document.createElement('div')
  castingsContainer.classList.add('allCastings')

  let castingsSaved = JSON.parse(localStorage.getItem('castings')) || []

  for (const casting of castings) {
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const city = document.createElement('h3')
    const date = document.createElement('h3')
    const number = document.createElement('p')
    const button = document.createElement('button')
    const castingDiv = document.createElement('div')

    img.src = casting.img
    h2.textContent = casting.performance
    date.textContent = `Fecha del casting: ${casting.date}`
    city.textContent = `Lugar del casting: ${casting.city}`
    number.textContent = `Número de inscritos: ${casting.userCount}`

    if (isMyCastingsPage) {
      button.textContent = 'Borrar mi inscripción'
      button.classList.add('delete-inscription')

      button.addEventListener('click', async () => {
        const userId = localStorage.getItem('userId')

        try {
          const response = await Api(
            `/api/v1/users/${userId}/${casting._id}`,
            'DELETE',
            null,
            true
          )

          if (response) {
            const updatedCastings = castingsSaved.filter(
              (id) => id !== casting._id
            )
            localStorage.setItem('castings', JSON.stringify(updatedCastings))
            castingsSaved = updatedCastings

            casting.userCount -= 1
            number.textContent = `Número de inscritos: ${casting.userCount}`

            castingDiv.remove()

            if (updatedCastings.length === 0) {
              castingsEmpty() 
            }
          }
        } catch (error) {
          console.error('Error al desinscribirse:', error)
          alert('Hubo un error al intentar eliminar tu inscripción.')
        }
      })
    } else {
      if (castingsSaved.includes(casting._id)) {
        button.textContent = 'Inscrito'
        button.classList.add('inscrito')
      } else {
        button.textContent = '¡Me apunto al casting!'
      }

      button.addEventListener('click', () =>
        clickButtonHome(casting, button, number)
      )
    }

    castingDiv.classList.add('casting')
    castingsContainer.append(castingDiv)
    castingDiv.append(img, h2, date, city, number, button)
  }

  app.append(castingsContainer)
}

const clickButtonHome = async (casting, button, number) => {
  if (button.disabled || button.classList.contains('inscrito')) {
    return
  }
  const token = localStorage.getItem('token')

  if (token) {
    const response = await meApunto(casting._id)
    if (response) {
      button.textContent = 'Inscrito'
      button.classList.add('inscrito')

      const currentCount = parseInt(number.textContent.split(': ')[1]) || 0
      number.textContent = `Número de inscritos: ${currentCount + 1}`
      button.disabled = true
    }
  } else {
    navigateTo('/login')
  }
}

const meApunto = async (castingId) => {
  const userId = localStorage.getItem('userId')

  const body = {
    castings: castingId
  }

  const response = await Api(
    `/api/v1/users/${userId}/castings`,
    'PUT',
    JSON.stringify(body),
    true
  )

  const castingsSaved = JSON.parse(localStorage.getItem('castings')) || []

  if (!castingsSaved.includes(castingId)) {
    castingsSaved.push(castingId)
  }

  localStorage.setItem('castings', JSON.stringify(castingsSaved))

  return response
}
