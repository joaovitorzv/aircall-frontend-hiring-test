import axios from 'axios'

const api = axios.create({
  baseURL: 'https://frontend-test-api.aircall.io'
})

export default api;