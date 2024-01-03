import { string, ref, object, boolean, number } from "yup"

export const firstNameValidator = string().min(2)

export const lastNameValidator = string().min(2)

export const emailValidator = string().email()

export const passwordValidator = string()
  .min(8)
  .max(30)
  .matches(/.*\p{Ll}.*/u, "Password must contain at least one lower char")
  .matches(/.*\p{Lu}.*/u, "Password must contain at least one upper char")
  .matches(/.*\d.*/u, "Password must contain at least one digit char")
  .matches(/.*[^\d\p{L}].*/u, "Password must contain at least one special char")

export const confirmPasswordValidator = string().oneOf(
  [ref("password"), null],
  "Passwords must match",
)

export const isDevModeValidator = boolean().default(false)

export const dbValidator = object({
  client: string().oneOf(["pg"]).required(),
  connection: string().required(),
})

export const passwordIterationsValidator = number().min(250000)

export const passwordKeylenValidator = number().min(128)

export const jwtSecretValidator = string().min(20)

export const jwtExpiresInValidator = string().oneOf([
  "1 day",
  "2 days",
  "3 days",
  "1 week",
  "2 weeks",
  "1 month",
])

export const sessionKeyValidator = string()

export const sessionSecureValidator = boolean()

export const paginationLimitValidator = number().min(1).default(10)

export const pageValidator = number().min(1).default(1)

export const idValidator = number().min(1)
