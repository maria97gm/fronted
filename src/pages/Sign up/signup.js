import { createForm } from '../../components/form/form'
import { createHeader, navigateTo } from '../../components/header/header'
import { Api } from '../../utils/API/api'
import './signup.css'

export const SignUp = () => {
  createForm({
    formClass: 'signup',
    title: '¡Te estábamos esperando en Teatrillados!',
    buttonText: 'Registrarme',
    funcion: async (userName, password) => {
      const body = JSON.stringify({
        userName,
        password
      })

      const res = await Api('/api/v1/users/register', 'POST', body)
      return res
    },
    respuesta: 'Ya existe un usuario con ese nombre',
    errorMessage: 'Ya existe un usuario con ese nombre, inténtalo de nuevo',
    funcionExito: (res) => {
      localStorage.setItem('userId', res.user._id)
      localStorage.setItem('token', res.token)
      createHeader()
      navigateTo('/cv')
    }
  })
}
