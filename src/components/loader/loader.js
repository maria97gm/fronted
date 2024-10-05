import './loader.css'

export const onLoader = () => {
  if (document.querySelector('.loader')) return

  const loader = document.createElement('div')
  loader.className = 'loader'

  loader.style.position = 'fixed'
  loader.style.top = '50%'
  loader.style.left = '50%'
  loader.style.transform = 'translate(-50%, -50%)'
  loader.style.zIndex = '9999'

  document.body.appendChild(loader)
}

export const offLoader = () => {
  const loader = document.querySelector('.loader')
  if (loader) {
    document.body.removeChild(loader)
  }
}
