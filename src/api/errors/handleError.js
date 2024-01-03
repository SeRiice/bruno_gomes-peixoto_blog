import { HTTP_ERRORS } from "@/api/errors/constants"
import {
  HttpForbiddenError,
  HttpNotFoundError,
  HttpPublicError,
  PublicError,
} from "@/api/errors/errors"
import { JsonWebTokenError } from "jsonwebtoken"
import { NotFoundError } from "objection"

const handleError = (err, { res }) => {
  const error = (() => {
    if (err instanceof JsonWebTokenError) {
      return new HttpForbiddenError()
    }

    if (err instanceof NotFoundError) {
      return new HttpNotFoundError()
    }

    return err
  })()

  if (!(error instanceof PublicError)) {
    // eslint-disable-next-line no-console
    console.error(error)

    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong." })
  }

  if (error instanceof HttpPublicError) {
    res.status(error.statusCode)
  }

  res.send({ error: error.message })
}

export default handleError
