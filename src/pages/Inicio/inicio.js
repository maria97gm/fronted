import { navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import './inicio.css'

export const Inicio = async () => {
  const castings = await Api('/api/v1/castings')
  printCastings(castings)
}
export const printCastings = (castings) => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const castingsContainer = document.createElement('div')
  castingsContainer.classList.add('allCastings')

  for (const casting of castings) {
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const city = document.createElement('h3')
    const date = document.createElement('h3')
    const button = document.createElement('button')
    const castingDiv = document.createElement('div')

    img.src = casting.img
    h2.textContent = casting.performance
    date.textContent = `Fecha del casting: ${casting.date}`
    city.textContent = `Lugar del casting: ${casting.city}`
    button.textContent = '¡Me apunto al casting!'
    castingDiv.classList.add('casting')

    const castingsSaved = JSON.parse(localStorage.getItem('castings')) || []
    console.log(castingsSaved)

    if (castingsSaved.includes(casting._id)) {
      button.textContent = 'Inscrito'
      button.classList.add('inscrito')
    }

    button.addEventListener('click', () => clickButtonHome(casting, button))

    castingsContainer.append(castingDiv)
    castingDiv.append(img, h2, date, city, button)
    app.append(castingsContainer)
  }
}

const clickButtonHome = async (casting, button) => {
  const token = localStorage.getItem('token')

  if (token) {
    await meApunto(casting._id)
    button.textContent = 'Inscrito'
    button.classList.add('inscrito')
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
    `/api/v1/users/${userId}`,
    'PUT',
    JSON.stringify(body),
    true
  )

  console.log(response)

  const castingsSaved = JSON.parse(localStorage.getItem('castings')) || []

  if (!castingsSaved.includes(castingId)) {
    castingsSaved.push(castingId)
  }
  console.log(castingsSaved)

  localStorage.setItem('castings', JSON.stringify(castingsSaved))

  return response
}
