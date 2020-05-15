import { post } from '../libs/post'

const URL = '/promote/pastPurchaseDetail'

export const API_passRecord = {
  query: post(URL)
}
