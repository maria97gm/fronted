import { navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import { printCastings } from '../Inicio/inicio'
import './castings.css'

export const Castings = async () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const allCastings = await Api('/api/v1/castings')

  const castingsSaved = JSON.parse(localStorage.getItem('castings')) || []

  const myCastings = allCastings.filter((casting) =>
    castingsSaved.includes(casting._id)
  )

  if (myCastings.length > 0) {
    printCastings(myCastings, true)
  } else {
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
