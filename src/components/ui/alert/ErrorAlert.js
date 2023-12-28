import { HTTP_ERRORS } from "@/api/errors/constants"
import Alert from "@/components/ui/alert/Alert"

const statusCodeMessages = {
  [HTTP_ERRORS.UNAUTHORIZED]: "Identifiants incorrects",
  [HTTP_ERRORS.LOCKED]: "Compte désactivé",
  [HTTP_ERRORS.INTERNAL_SERVER_ERROR]: "Erreur serveur",
}
const ErrorAlert = (props) => {
  const { isError, statusCode } = props

  if (!isError) {
    return null
  }

  return (
    <Alert variant="error">
      {statusCode ? statusCodeMessages[statusCode] : "Erreur détectée"}
    </Alert>
  )
}

export default ErrorAlert
