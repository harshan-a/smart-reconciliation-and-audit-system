import type { NextFunction, Response, Request } from "express"
import OTP from "../models/Otp.js"
import nodemailer from "nodemailer"
import BadRequest from "../errors/BadRequest.js"
import Unauthorized from "../errors/Unauthorized.js"

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTPEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.PRIMARY_GMAIL,
      pass: process.env.PRIMARY_GMAIL_APP_PASS,
    },
  })

  return transporter.sendMail({
    from: `<${process.env.PRIMARY_GMAIL}>`,
    to: email,
    subject: "OTP for reset password",
    html: `
      Hi there,

      The 6-digits OTP(one-time-password) is ${otp} (valid for 10 minutes)
    `,
  })
}

export async function sendOTP(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body
  if (!email) throw new BadRequest("Email is missing:(")

  const otp = generateOTP()
  await OTP.findOneAndUpdate(
    { email },
    { otp, createAt: Date.now() },
    { upsert: true },
  )
  await sendOTPEmail(email, otp)

  res.status(200).json({ success: true, msg: "OTP successfully send." })
}

export async function verifyOTP(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, otp } = req.body
  if (!email || !otp) throw new BadRequest("Email or OTP is missing:(")

  const otpInDb = await OTP.findOne({ email, otp })
  if (!otpInDb) throw new Unauthorized("Invalid otp. Try again:(")

  res.status(200).json({ success: true, msg: "OTP verified successfully." })
}
