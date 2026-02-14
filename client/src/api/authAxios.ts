import axios from "axios"
import { getAccessToken } from "../utils/token"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong:("

    window.dispatchEvent(new CustomEvent("api-error", { detail: message }))

    return Promise.reject(error)
  },
)

export default api
