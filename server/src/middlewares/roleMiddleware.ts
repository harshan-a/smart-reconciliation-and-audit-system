import type { NextFunction, Request, Response } from "express"
import type { Role } from "../express.js"
import { Unauthorized, Forbidden } from "../errors/index.js"

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req
    if (!user) return next(new Unauthorized("Unauthorized."))

    if (!allowedRoles.includes(user.role))
      return next(
        new Forbidden(
          `Access denied. Required role: ${allowedRoles.join(", ")}`,
        ),
      )

    next()
  }
}
