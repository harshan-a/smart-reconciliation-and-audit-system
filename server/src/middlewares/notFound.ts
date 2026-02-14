import type { NextFunction, Request, Response } from "express"

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ success: false, msg: "Route not found" })
}
