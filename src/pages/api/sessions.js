import { HttpAuthentificationError, HttpLockedError } from "@/api/errors/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  MAX_AVERAGE_PASSWORD_HASHING_DURATION,
  MIN_AVERAGE_PASSWORD_HASHING_DURATION,
} from "@/db/constants"
import hashPassword from "@/db/hashPassword"
import randomTime from "@/utils/randomTime"
import sleep from "@/utils/sleep"
import { emailValidator } from "@/utils/validators"
import { string } from "yup"
import jwt from "jsonwebtoken"
import config from "@/api/config"
import webConfig from "@/web/config"
import setCookie from "@/api/utils/setCookie"

const handlers = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: string().required(),
      },
    }),
    async ({
      res,
      models: { UserModel },
      input: {
        body: { email, password },
      },
    }) => {
      const user = await UserModel.query()
        .findOne({ email })
        .withGraphFetched("role")

      if (!user) {
        await sleep(
          randomTime(
            MIN_AVERAGE_PASSWORD_HASHING_DURATION,
            MAX_AVERAGE_PASSWORD_HASHING_DURATION,
          ),
        )

        throw new HttpAuthentificationError()
      }

      const [passwordHash] = await hashPassword(password, user.passwordSalt)

      if (passwordHash !== user.passwordHash) {
        throw new HttpAuthentificationError()
      }

      if (user.disabled) {
        throw new HttpLockedError()
      }

      const { id, firstName, lastName, role } = user
      const token = jwt.sign(
        { payload: { user: { id, firstName, lastName, email }, role } },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn },
      )
      const cookieToken = jwt.sign(
        { payload: token },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn },
      )

      res.setHeader(
        "Set-Cookie",
        setCookie(webConfig.security.session.key, cookieToken),
      )

      res.send({ token })
    },
  ],
})

export default handlers
