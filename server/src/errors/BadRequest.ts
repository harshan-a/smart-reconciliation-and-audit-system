import CustomError from "./CustomError.js"
import { StatusCodes } from "http-status-codes"

class BadRequest extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.BAD_REQUEST)
  }
}

export default BadRequest
