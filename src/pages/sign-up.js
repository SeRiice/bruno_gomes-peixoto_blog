import FieldForm from "@/components/ui/form/FieldForm"
import SignForm from "@/components/ui/form/SignForm"
import { object } from "yup"
import {
  confirmPasswordValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators"
import { useMutation } from "@tanstack/react-query"
import { createResource } from "@/web/services/api"
import Alert from "@/components/ui/alert/Alert"
import { Formik } from "formik"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}
const validationSchema = object({
  firstName: firstNameValidator.required().label("First name"),
  lastName: lastNameValidator.required().label("Last name"),
  email: emailValidator.required().label("Email"),
  password: passwordValidator.required().label("Password"),
  confirmPassword: confirmPasswordValidator
    .required()
    .label("Confirm password"),
})
const SignUp = () => {
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: (values) => createResource("users", { data: values }),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      {isSuccess && <Alert>Inscription validé !</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <SignForm
          formTitle="Complétez ce formulaire"
          buttonText={isPending ? "ENVOI DES DONNÉES..." : "S'INSCRIRE"}
          linkInfo={{
            text: "Déjà un compte ?",
            href: "/sign-in",
            hrefText: "Connectez-vous",
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <FieldForm label="PRÉNOM" name="firstName" />
            <FieldForm label="NOM" name="lastName" />
          </div>
          <FieldForm label="E-MAIL" name="email" type="email" />
          <FieldForm label="MOT DE PASSE" name="password" type="password" />
          <FieldForm
            label="CONFIRMER LE MOT DE PASSE"
            name="confirmPassword"
            type="password"
          />
        </SignForm>
      </Formik>
    </div>
  )
}

export default SignUp
