// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1488/api', // замени на свой адрес, если нужно
})

export default api
