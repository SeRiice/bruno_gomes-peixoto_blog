import { ValidationError, object } from "yup"
import chalk from "chalk"
import { sessionKeyValidator, sessionSecureValidator } from "@/utils/validators"

let config = null

const validationSchema = object({
  security: object({
    session: object({
      key: sessionKeyValidator.required(),
      secure: sessionSecureValidator.required(),
    }).noUnknown(),
  }).noUnknown(),
})

try {
  config = validationSchema.validateSync(
    {
      security: {
        session: {
          key: process.env.NEXT_PUBLIC_SECURITY__SESSION__KEY,
          secure: process.env.NODE_ENV !== "development",
        },
      },
    },
    { abortEarly: false },
  )
} catch (err) {
  if (!(err instanceof ValidationError)) {
    throw err
  }

  // eslint-disable-next-line no-console
  console.error(
    `${chalk.red(
      chalk.bold("\nError: Missing or wrong values for api/config.js"),
    )}\n\t- ${chalk.italic(err.errors.join("\n\t- "))}`.trim(),
  )

  process.exit(1)
}

export default config
