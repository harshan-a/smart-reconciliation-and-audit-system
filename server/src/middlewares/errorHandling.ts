import type { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"

export default function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // console.log(error)
  const customError = {
    msg: error.message || "Something went wrong, please try again later...",
    statusCode: error.statusCode || 500,
  }
  // if (error instanceof CustomError) {
  //   return res
  //     .status(error.statusCode)
  //     .json({ success: false, msg: error.message })
  // }
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)
    customError.msg = `Duplication on ${field}, try different ${field}`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((err: any) => err?.message)
      .join(" & ")

    customError.msg = message
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (error.name === "CastError") {
    customError.msg = `No item found with id ${error.value}`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.msg, err: error })
}
