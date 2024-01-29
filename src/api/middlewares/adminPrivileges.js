import { HttpForbiddenError } from "@/api/errors/errors"
import jwt from "jsonwebtoken"

const adminPrivileges = async ({ req, next }) => {
  const { authorization } = req.headers
  const {
    payload: {
      role: { name },
    },
  } = jwt.decode(authorization)

  if (name !== "ADMIN") {
    throw new HttpForbiddenError()
  }

  await next()
}

export default adminPrivileges
