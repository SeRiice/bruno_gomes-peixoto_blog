import BasicStructure from "@/components/ui/form/BasicStructure"
import FieldForm from "@/components/ui/form/FieldForm"
import Form from "@/components/ui/form/Form"
import { firstNameValidator, lastNameValidator } from "@/utils/validators"
import { updateResource } from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const validationSchema = object({
  firstName: firstNameValidator.required(),
  lastName: lastNameValidator.required(),
})
const EditUserForm = (props) => {
  const { user } = props
  const router = useRouter()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      updateResource(["users", user.id], { data: values }),
  })
  const handleSubmit = async (values) => {
    try {
      await mutateAsync(values)
    } catch (err) {
      return
    } finally {
      router.back()
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      <Formik
        initialValues={{ firstName: user.firstName, lastName: user.lastName }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form variant="user">
          <BasicStructure
            formTitle="Modifier les informations suivantes"
            buttonText={isPending ? "ENVOI DES DONNÉES" : "MODIFIER LE PROFIL"}
          >
            <FieldForm name="firstName" label="Prénom" />
            <FieldForm name="lastName" label="Nom" />
          </BasicStructure>
        </Form>
      </Formik>
    </div>
  )
}

export default EditUserForm
