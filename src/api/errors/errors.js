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

export class HttpArgumentsError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNPROCESSABLE_ENTITY

  constructor(errors) {
    super(
      errors
        ? `Invalid arguments\n\t- ${errors.join("\n\t- ")}`.trim()
        : "Invalid arguments.",
    )
  }
}

export class HttpAuthentificationError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNAUTHORIZED

  constructor(message = "Invalid credentials.") {
    super(message)
  }
}

export class HttpLockedError extends HttpPublicError {
  statusCode = HTTP_ERRORS.LOCKED

  constructor(message = "The resource you are trying to access is disabled.") {
    super(message)
  }
}

export class HttpForbiddenError extends HttpPublicError {
  statusCode = HTTP_ERRORS.FORBIDDEN

  constructor(message = "Forbidden.") {
    super(message)
  }
}

export class HttpNotFoundError extends HttpPublicError {
  statusCode = HTTP_ERRORS.NOT_FOUND

  constructor(message = "Resource not found.") {
    super(message)
  }
}
