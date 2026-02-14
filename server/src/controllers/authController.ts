import type { NextFunction, Request, Response } from "express"
import { BadRequest, Unauthorized, NotFound } from "../errors/index.js"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  if (!email || !password) throw new BadRequest("Something missing:(")

  let user = await User.findOne({ email })
  if (!user) throw new NotFound("User not found")

  if (!(await user.comparePassword(password)))
    throw new Unauthorized("Incorrect Password:(")

  const token = user.generateAccessToken()
  // res.cookie("accessToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 1000 * 60 * 60 * 24 * 10,
  // })

  res.status(200).json({
    success: true,
    token,
    msg: "User logged in successfully:)",
  })
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const {
    name,
    email,
    password,
    role,
    roleSecret,
  }: {
    name: string
    email: string
    password: string
    role: "admin" | "analyst" | "viewer"
    roleSecret?: string
  } = req.body

  if (!email || !password || !name || !role)
    throw new BadRequest("Something missing:(")

  if (role !== "viewer")
    if (roleSecret) {
      if (
        (role === "admin" && roleSecret !== process.env.ADMIN_ROLE_SECERT) ||
        (role === "analyst" && roleSecret !== process.env.ANALYST_ROLE_SECERT)
      )
        throw new Unauthorized("Incorrect role secret")
    } else throw new Unauthorized("Role secret is missing:(")

  const user = await User.create(req.body)

  const token = user.generateAccessToken()

  // res.cookie("accessToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 1000 * 60 * 60 * 24 * 10,
  // })

  res.status(200).json({
    success: true,
    token,
    msg: "User registered in successfully:)",
  })
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body

  if (!email || !password) throw new BadRequest("Something missing:(")

  let user = await User.findOne({ email })
  if (!user) throw new NotFound("User not found")

  user.password = password
  await user.save()

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password has been changed." })
}
