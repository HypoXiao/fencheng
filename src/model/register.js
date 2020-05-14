import { post } from '../libs/post'

const URL = '/promote/unPurchaseUser'

export const API_register = {
  query: post(URL)
}
