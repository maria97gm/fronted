import { Api } from '../../utils/API/api'

export const verifyToken = async () => {
  try {
    const response = await Api('/api/v1/users/verify-token', 'GET', null, true)
    console.log('Respuesta de verifyToken:', response)

    return response?.message === 'Token válido'
  } catch (error) {
    console.error('Error verificando el token:', error)
    return false
  }
}
