import BasicStructure from "@/components/ui/form/BasicStructure"
import FieldForm from "@/components/ui/form/FieldForm"
import Form from "@/components/ui/form/Form"
import useRoles from "@/hooks/useRoles"
import {
  firstNameValidator,
  idValidator,
  lastNameValidator,
} from "@/utils/validators"
import { updateResource } from "@/web/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = (user, isAdmin) => {
  const baseValues = { firstName: user.firstName, lastName: user.lastName }

  return isAdmin ? { ...baseValues, roleId: user.roleId } : baseValues
}
const validationSchema = (isAdmin) => {
  const baseSchema = {
    firstName: firstNameValidator.required(),
    lastName: lastNameValidator.required(),
  }

  return object(
    isAdmin
      ? {
          ...baseSchema,
          roleId: idValidator.required(),
        }
      : baseSchema,
  )
}
const EditUserForm = (props) => {
  const { user, isAdmin } = props
  const router = useRouter()
  const { roles } = useRoles(isAdmin)
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      updateResource(["users", user.id], { data: values }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["users"],
      }),
  })
  const handleSubmit = async (values) => {
    try {
      await mutateAsync(values)
    } finally {
      router.back()
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      <Formik
        initialValues={initialValues(user, isAdmin)}
        validationSchema={validationSchema(isAdmin)}
        onSubmit={handleSubmit}
      >
        <Form variant="user">
          <BasicStructure
            formTitle="Modifier les informations suivantes"
            buttonText={isPending ? "ENVOI DES DONNÉES" : "MODIFIER LE PROFIL"}
          >
            <FieldForm name="firstName" label="Prénom" />
            <FieldForm name="lastName" label="Nom" />
            {isAdmin && (
              <FieldForm name="roleId" as="select" label="Rôle">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </FieldForm>
            )}
          </BasicStructure>
        </Form>
      </Formik>
    </div>
  )
}

export default EditUserForm
