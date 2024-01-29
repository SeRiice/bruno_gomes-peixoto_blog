import config from "@/api/config"
import adminPrivileges from "@/api/middlewares/adminPrivileges"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  MAX_AVERAGE_PASSWORD_HASHING_DURATION,
  MIN_AVERAGE_PASSWORD_HASHING_DURATION,
} from "@/db/constants"
import hashPassword from "@/db/hashPassword"
import randomTime from "@/utils/randomTime"
import sleep from "@/utils/sleep"
import {
  confirmPasswordValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  pageValidator,
  passwordValidator,
} from "@/utils/validators"

const handlers = mw({
  POST: [
    validate({
      body: {
        firstName: firstNameValidator.required(),
        lastName: lastNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        confirmPassword: confirmPasswordValidator.required(),
      },
    }),
    async ({
      res,
      models: { RoleModel, UserModel },
      input: {
        body: { firstName, lastName, email, password },
      },
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        await sleep(
          randomTime(
            MIN_AVERAGE_PASSWORD_HASHING_DURATION,
            MAX_AVERAGE_PASSWORD_HASHING_DURATION,
          ),
        )

        res.send({ userCreated: true })

        return
      }

      const { id: roleId } = await RoleModel.query().findOne({ name: "USER" })
      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insert({
        firstName,
        lastName,
        email,
        passwordHash,
        passwordSalt,
        roleId,
      })

      res.send({ userCreated: true })
    },
  ],
  GET: [
    auth,
    adminPrivileges,
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      models: { UserModel },
      input: {
        query: { page },
      },
    }) => {
      const {
        pagination: { limit },
      } = config
      const { results, total } = await UserModel.query()
        .page(page - 1, limit)
        .modify("restrictSelection")
        .withGraphFetched("role")
        .orderBy("createdAt", "desc")
      const maxPages = Math.ceil(total / limit)
      const nextPage = page + 1 > maxPages ? null : page + 1
      const previousPage = page - 1 < 1 ? null : page - 1

      send(results, {
        maxPages,
        nextPage,
        previousPage,
        page,
      })
    },
  ],
})

export default handlers
