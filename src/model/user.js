import { post } from '../libs/post'

const URL = '/users'

export const API_user = {
  logout: post('/logout'),
  login: post('/login')
}
