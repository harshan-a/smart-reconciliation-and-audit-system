import type { NextFunction, Request, Response } from "express"
import { BadRequest, NotFound, Unauthorized } from "../errors/index.js"
import User from "../models/User.js"

export async function checkEmailExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.query
  if (!email) throw new BadRequest("Something missing:(")

  const user = await User.findOne({ email })
  if (!user) throw new NotFound("User not found")

  res.sendStatus(200)
}

export async function getUsers(req: Request, res: Response) {
  const users = await User.find({}).select("name role")
  res.status(200).json({ success: true, data: users })
}
