import CustomError from "./CustomError.js"
import { StatusCodes } from "http-status-codes"

class Unauthorized extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.UNAUTHORIZED)
  }
}

export default Unauthorized
