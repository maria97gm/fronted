import { Login } from '../../pages/Login/login'
import { Castings } from '../../pages/Castings/castings'
import { Inicio } from '../../pages/Inicio/inicio'
import { SignUp } from '../../pages/Sign up/signup'

export const routes = [
  {
    path: '/',
    text: 'Inicio',
    page: Inicio
  },
  {
    path: '/castings',
    text: 'Mis Castings',
    page: Castings
  },
  {
    path: '/login',
    text: 'Login',
    page: Login
  },
  {
    path: '/sign-up',
    text: 'Sign up',
    page: SignUp
  }
]
