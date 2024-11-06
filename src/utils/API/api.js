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
      body: body ? body : undefined
    }

    const response = await fetch(
      `https://backteatrillados.vercel.app${endpoint}`,
      // http://localhost:3000${endpoint},
      {
        method,
        headers,
        body: body ? body : undefined
      }
    )

    const res = await response.json()
    return res
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}
