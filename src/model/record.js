import { post } from '../libs/post'

const URL = '/promote/purchaseDetail'

export const API_record = {
  query: post(URL)
}
