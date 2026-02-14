import axios from "./axios"
import type { AxiosOTPResponse } from "../types"

export function sendOTP({
  email,
}: {
  email: string
}): Promise<AxiosOTPResponse> {
  return axios.post("/otp/send", { email })
}

export function verifyOTP({
  email,
  otp,
}: {
  email: string
  otp: string
}): Promise<AxiosOTPResponse> {
  return axios.post("/otp/verify", { email, otp })
}
