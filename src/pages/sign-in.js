import FieldForm from "@/components/ui/form/FieldForm"
import SignForm from "@/components/ui/form/SignForm"
import { object, string } from "yup"
import { emailValidator } from "@/utils/validators"
import { useMutation } from "@tanstack/react-query"
import { createResource } from "@/web/services/api"
import { useSession } from "@/components/SessionContext"
import ErrorAlert from "@/components/ui/alert/ErrorAlert"
import { Formik } from "formik"

const initialValues = {
  email: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.required().label("Email"),
  password: string().required().label("Password"),
})
const SignIn = () => {
  const { signIn } = useSession()
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (values) => createResource("sessions", { data: values }),
  })
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const {
        data: { token },
      } = await mutateAsync(values)

      signIn(token)
    } catch (err) {
      return
    } finally {
      resetForm()
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      <ErrorAlert isError={isError} statusCode={error?.response.status} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <SignForm
          formTitle="Saisissez vos identifiants"
          buttonText={isPending ? "ENVOI DES DONNÉES..." : "SE CONNECTER"}
          linkInfo={{
            text: "Toujours pas de compte ?",
            href: "/sign-up",
            hrefText: "Inscrivez-vous",
          }}
        >
          <FieldForm label="E-MAIL" name="email" type="email" />
          <FieldForm label="MOT DE PASSE" name="password" type="password" />
        </SignForm>
      </Formik>
    </div>
  )
}

export default SignIn
