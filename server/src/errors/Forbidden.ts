import CustomError from "./CustomError.js"
import { StatusCodes } from "http-status-codes"

class Forbidden extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.FORBIDDEN)
  }
}

export default Forbidden
