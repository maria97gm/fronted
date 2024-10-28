import { navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import { printCastings } from '../Inicio/inicio'
import './castings.css'

export const Castings = async () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const token = localStorage.getItem('token')

  if (!token) {
    castingsEmpty()
    return
  }

  try {
    const myCastings = await Api(
      '/api/v1/users/mis-castings',
      'GET',
      null,
      true
    )

    if (myCastings && myCastings.length > 0) {
      printCastings(myCastings, true)
    } else {
      castingsEmpty()
    }
  } catch (error) {
    console.error('Error al obtener castings del usuario:', error)
    castingsEmpty()
  }
}

export const castingsEmpty = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
  <div class="castings">
    <h1>No tienes castings inscritos</h1>
    <h2>Puedes explorar nuestros castings de Teatrillados y apuntarte.</h2>
    <button id="exploreButton">Explorar castings</button>
  </div>
`
  const exploreButton = document.getElementById('exploreButton')
  exploreButton.addEventListener('click', () => {
    navigateTo('/')
  })
}
