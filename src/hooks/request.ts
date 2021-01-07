import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1 * 60 * 1000,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

$axios.interceptors.response.use((response: AxiosResponse) => {
  return Promise.resolve(response.data)
})

const handleRequest = (url = '', data?) => {
  return (reqConfig: AxiosRequestConfig = {}) => {
    let req
    if (!reqConfig.method || /^get$/i.test(reqConfig.method)) {
      req = $axios.request({
        url: url,
        params: data,
        ...reqConfig
      })
    } else {
      req = $axios.request({
        url: url,
        data: data,
        ...reqConfig
      })
    }
    return req
  }
}

export default handleRequest
