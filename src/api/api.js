const axios = require('axios').default

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((request) => {
  return request
})

api.interceptors.response.use((resposne) => {
  return resposne
})

module.exports = api
