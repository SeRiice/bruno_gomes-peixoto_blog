import createContext from "@/api/createContext"
import { HTTP_ERRORS } from "@/api/errors/constants"
import handleError from "@/api/errors/handleError"

const mw = (methodByHandlers) => async (req, res) => {
  const handlers = methodByHandlers[req.method.toUpperCase()]

  if (!handlers) {
    res
      .status(HTTP_ERRORS.METHOD_NOT_ALLOWED)
      .send({ error: "Method not allowed." })

    return
  }

  let currentIndex = 0
  const next = async () => {
    const handler = handlers[currentIndex]
    currentIndex += 1

    await handler(ctx)
  }
  const ctx = createContext({ req, res, next })

  try {
    await next()
  } catch (err) {
    handleError(err, ctx)
  } finally {
    await ctx.db.destroy()
  }
}

export default mw
