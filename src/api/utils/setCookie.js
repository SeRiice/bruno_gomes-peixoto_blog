import config from "@/api/config"
import webConfig from "@/web/config"
import { serialize } from "cookie"
import ms from "ms"

const setCookie = (cookieName, cookieValue, options = {}) =>
  serialize(cookieName, cookieValue, {
    maxAge: ms(config.security.jwt.expiresIn) / 1000,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: webConfig.security.session.secure,
    ...options,
  })

export default setCookie
