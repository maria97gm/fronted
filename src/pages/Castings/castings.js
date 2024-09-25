import { Api } from '../../utils/API/api'
import { printCastings } from '../Inicio/inicio'

export const Castings = async () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''

  const allCastings = await Api('/api/v1/castings')

  const castingsSaved = JSON.parse(localStorage.getItem('castings')) || []

  const myCastings = allCastings.filter((casting) =>
    castingsSaved.includes(casting._id)
  )

  if (myCastings.length > 0) {
    printCastings(myCastings)
  } else {
    app.innerHTML = '<p>No tienes castings inscritos.</p>'
  }
}
