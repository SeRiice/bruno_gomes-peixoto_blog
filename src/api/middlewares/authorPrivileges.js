import { HttpForbiddenError } from "@/api/errors/errors"
import jwt from "jsonwebtoken"

const authorPrivileges = async ({ req, next }) => {
  const { authorization } = req.headers
  const {
    payload: {
      role: { name },
    },
  } = jwt.decode(authorization)

  if (name === "USER") {
    throw new HttpForbiddenError()
  }

  await next()
}

export default authorPrivileges
