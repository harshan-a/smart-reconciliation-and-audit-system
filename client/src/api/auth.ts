import axios from "./axios"
import type { AxiosAuthResponse, Role } from "../types"

export async function login(data: {
  email: string
  password: string
}): Promise<AxiosAuthResponse> {
  return axios.post("/auth/login", data)
}

type SignupData = {
  name: string
  email: string
  password: string
  role: Role
  roleSecret: string
}
export function signup(data: SignupData): Promise<AxiosAuthResponse> {
  return axios.post("/auth/signup", data)
}

export function changePassword(data: {
  email: string
  password: string
}): Promise<{ data: { success: boolean; msg: string } }> {
  return axios.post("/auth/change-password", data)
}
