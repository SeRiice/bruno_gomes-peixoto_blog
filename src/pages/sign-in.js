import FieldForm from "@/components/ui/FieldForm"
import SignForm from "@/components/ui/SignForm"
import { object, string } from "yup"
import { emailValidator } from "@/utils/validators"

const initialValues = {
  email: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.required().label("Email"),
  password: string().required().label("Password"),
})
const SignIn = () => {
  const handleSubmit = () => null

  return (
    <div className="flex w-full items-center justify-center">
      <SignForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        formTitle="Saisissez vos identifiants"
        buttonText="SE CONNECTER"
        linkInfo={{
          text: "Toujours pas de compte ?",
          href: "/sign-up",
          hrefText: "Inscrivez-vous",
        }}
      >
        <FieldForm label="E-MAIL" name="email" type="email" />
        <FieldForm label="MOT DE PASSE" name="password" type="password" />
      </SignForm>
    </div>
  )
}

export default SignIn
