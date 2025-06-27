import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000',
  withCredentials: true,
})

api.interceptors.response.use(
  res => res,
  async err => {
    let originalRequest = err.config;
    console.log(originalRequest)
    console.log(err)
    if(err.response?.status === 403 && !originalRequest._retry){
      originalRequest._retry = true;
      try {
        await api.post('/users/refresh')
        return api(originalRequest)
      } catch {
        return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)

export default api;