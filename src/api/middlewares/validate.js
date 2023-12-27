import { HttpArgumentsError } from "@/api/errors/errors"
import { ValidationError, object } from "yup"

const validate =
  ({ body: bodyValidator, query: queryValidator }) =>
  async (ctx) => {
    const { req, next } = ctx

    try {
      const sanitizedInput = await object({
        body: bodyValidator ? object(bodyValidator) : null,
        query: queryValidator ? object(queryValidator) : null,
      })
        .noUnknown()
        .validate(
          {
            body: bodyValidator ? req.body || {} : null,
            query: queryValidator ? req.query || {} : null,
          },
          {
            abortEarly: false,
          },
        )

      // eslint-disable-next-line require-atomic-updates
      ctx.input = sanitizedInput

      await next()
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new HttpArgumentsError(err.errors)
      }

      throw err
    }
  }

export default validate
