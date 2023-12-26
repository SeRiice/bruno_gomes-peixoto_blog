// eslint-disable-next-line max-classes-per-file
import { HTTP_ERRORS } from "@/api/errors/constants"

export class PublicError extends Error {}

export class HttpPublicError extends PublicError {}

export class HttpMethodError extends HttpPublicError {
  statusCode = HTTP_ERRORS.METHOD_NOT_ALLOWED

  constructor(message = "Method not allowed.") {
    super(message)
  }
}
