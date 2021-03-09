import axios from 'axios'

import { setupInterceptorsTo } from "./interceptors";

const api = axios.create({
  baseURL: 'https://frontend-test-api.aircall.io'
})

setupInterceptorsTo(api)

export default api;