import { type AxiosRequestConfig } from "axios"
import axios from "./axios"
import api from "./authAxios"

export function checkEmailExists({
  email,
  options,
}: {
  email: string
  options?: AxiosRequestConfig<any>
}) {
  return axios.get("/users/check?email=" + email, options)
}

export function getUsers() {
  return api.get("/users")
}
