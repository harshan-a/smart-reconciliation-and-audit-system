import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express"
import { Unauthorized, InternalServer } from "../errors/index.js"

interface CustomPayload extends jwt.JwtPayload {
  userId: string
  role: "admin" | "analyst" | "viewer"
  isActive: boolean
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  if (!authorization && !authorization?.startsWith("Bearer "))
    throw new Unauthorized("Access Denied.")

  const token = authorization.split(" ")[1]
  if (!token) throw new Unauthorized("Access Denied.")

  if (!process.env.ACCESS_TOKEN_PRIVATE_KEY)
    throw new InternalServer("Something error:(")
  jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, payload) => {
    if (err) return next(new Unauthorized(err.message))

    const { userId, role, isActive } = payload as CustomPayload
    req.user = { userId, role, isActive }
    next()
  })
}
