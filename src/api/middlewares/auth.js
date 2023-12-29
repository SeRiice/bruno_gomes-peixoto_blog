import config from "@/api/config"
import { HttpForbiddenError } from "@/api/errors/errors"
import webConfig from "@/web/config"
import jwt from "jsonwebtoken"

const auth = async ({ req, next }) => {
  const { authorization } = req.headers
  const cookieToken = req.cookies[webConfig.security.session.key]

  jwt.verify(authorization, config.security.jwt.secret, {
    maxAge: config.security.jwt.expiresIn,
  })

  const verifiedCookieToken = jwt.verify(
    cookieToken,
    config.security.jwt.secret,
    { maxAge: config.security.jwt.expiresIn },
  )

  if (verifiedCookieToken.payload !== authorization) {
    throw new HttpForbiddenError()
  }

  await next()
}

export default auth
