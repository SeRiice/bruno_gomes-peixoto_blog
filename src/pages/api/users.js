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
})

export default handlers
