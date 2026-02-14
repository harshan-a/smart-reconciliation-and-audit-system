import { Request } from "express"

type Role = "admin" | "viewer" | "analyst"

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        role: Role
        isActive: boolean
      }
    }
  }
}
