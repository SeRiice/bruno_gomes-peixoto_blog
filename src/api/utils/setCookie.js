import config from "@/api/config"
import webConfig from "@/web/config"
import { serialize } from "cookie"
import ms from "ms"

const setCookie = (cookieName, cookieValue, options = {}) =>
  serialize(cookieName, cookieValue, {
    maxAge: Date.now() + ms(config.security.jwt.expiresIn),
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: webConfig.security.session.secure,
    ...options,
  })

export default setCookie
