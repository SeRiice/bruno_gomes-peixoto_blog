import FieldForm from "@/components/ui/FieldForm"
import SignForm from "@/components/ui/SignForm"
import { object } from "yup"
import {
  confirmPasswordValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators"

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
  const handleSubmit = () => null

  return (
    <div className="flex w-full items-center justify-center">
      <SignForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        formTitle="Complétez ce formulaire"
        buttonText="S'INSCRIRE"
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
    </div>
  )
}

export default SignUp
