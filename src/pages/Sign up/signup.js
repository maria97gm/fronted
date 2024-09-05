import { createForm } from '../../components/form/form'
import './signup.css'

export const SignUp = () => {
  createForm({
    formClass: 'signup',
    title: '¡Te estábamos esperando en Teatrillados!',
    buttonText: 'Registrarme'
  })
}
