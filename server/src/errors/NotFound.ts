import CustomError from "./CustomError.js"
import { StatusCodes } from "http-status-codes"

class NotFound extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.NOT_FOUND)
  }
}

export default NotFound
