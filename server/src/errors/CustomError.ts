abstract class CustomError extends Error {
  statusCode: number
  constructor(msg: string, code: number) {
    super(msg)
    this.statusCode = code
  }
}

export default CustomError
