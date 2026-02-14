import CustomError from "./CustomError.js"
import { StatusCodes } from "http-status-codes"

class InternalServer extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export default InternalServer
