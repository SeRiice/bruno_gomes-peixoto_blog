import { dbValidator, isDevModeValidator } from "@/utils/validators"
import { ValidationError, object } from "yup"
import knexfile from "../../knexfile.mjs"
import chalk from "chalk"

let config = null

const validationSchema = object({
  isDevMode: isDevModeValidator,
  db: dbValidator.noUnknown(),
})

try {
  config = validationSchema.validateSync(
    {
      isDevMode: process.env.NODE_ENV === "development",
      db: knexfile,
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
