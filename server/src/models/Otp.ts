import { Schema, model } from "mongoose"

const otpSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10,
  },
})

export default model("OTP", otpSchema)
