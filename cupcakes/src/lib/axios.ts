import { ConfigBases } from '@config/index'
import axios from 'axios'

export const api = axios.create({
  baseURL: ConfigBases.cupcakes.baseUrls.apiProducts
})
