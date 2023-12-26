import { HTTP_ERRORS } from "@/api/errors/constants"
import { HttpPublicError, PublicError } from "@/api/errors/errors"

const handleError = (err, { res }) => {
  if (!(err instanceof PublicError)) {
    // eslint-disable-next-line no-console
    console.error(err)

    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong." })
  }

  if (err instanceof HttpPublicError) {
    res.status(err.statusCode)
  }

  res.send({ error: err.message })
}

export default handleError
