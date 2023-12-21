import { string, ref } from "yup"

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
