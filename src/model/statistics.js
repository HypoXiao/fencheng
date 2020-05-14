import { post } from '../libs/post'

const URL = '/home/index'

export const API_statistics = {
  query: post(URL)
}
