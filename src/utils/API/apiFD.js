export const ApiFD = async (endpoint, method = 'POST', body = null) => {
  try {
    const headers = {}
    const token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers,
      body: body ? body : undefined
    })

    const res = await response.json()
    return res
  } catch (error) {
    console.error('Error en la API (FormData):', error)
  }
}
