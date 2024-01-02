import {
  dbValidator,
  isDevModeValidator,
  jwtExpiresInValidator,
  jwtSecretValidator,
  paginationLimitValidator,
  passwordIterationsValidator,
  passwordKeylenValidator,
} from "@/utils/validators"
import { ValidationError, object } from "yup"
import knexfile from "../../knexfile.mjs"
import chalk from "chalk"

let config = null

const validationSchema = object({
  isDevMode: isDevModeValidator,
  db: dbValidator.noUnknown(),
  security: object({
    password: object({
      iterations: passwordIterationsValidator.required(),
      keylen: passwordKeylenValidator.required(),
    }).noUnknown(),
    jwt: object({
      secret: jwtSecretValidator.required(),
      expiresIn: jwtExpiresInValidator.required(),
    }).noUnknown(),
  }).noUnknown(),
  pagination: object({
    limit: paginationLimitValidator.required(),
  }),
})

try {
  config = validationSchema.validateSync(
    {
      isDevMode: process.env.NODE_ENV === "development",
      db: knexfile,
      security: {
        password: {
          iterations: Number.parseInt(
            process.env.SECURITY__PASSWORD__ITERATIONS,
            10,
          ),
          keylen: Number.parseInt(process.env.SECURITY__PASSWORD__KEYLEN, 10),
        },
        jwt: {
          secret: process.env.SECURITY__JWT__SECRET,
          expiresIn: process.env.SECURITY__JWT__EXPIRES_IN,
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
