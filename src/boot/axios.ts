import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_URL })

export default boot(async ({ app, router }   /* { app, router, ... } */) => {
  // something to do
 
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

})

export { axios, api }