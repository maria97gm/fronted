export const Api = async (
  endpoint,
  method = 'GET',
  body = null,
  requiresToken = false
) => {
  try {
    const headers = {}

    if (requiresToken) {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(
      `https://backteatrillados.vercel.app${endpoint}`,
      {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw { response: { status: response.status, message: errorData.message || 'Error en la API' }}
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}
