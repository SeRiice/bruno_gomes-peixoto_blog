import { useSession } from "@/components/SessionContext"
import SubmitButton from "@/components/ui/button/SubmitButton"
import FieldForm from "@/components/ui/form/FieldForm"
import Form from "@/components/ui/form/Form"
import { contentValidator } from "@/utils/validators"
import { createResource } from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  content: "",
}
const validationSchema = object({
  content: contentValidator.required().label("Comment"),
})
const CommentForm = (props) => {
  const { postId, setNewComments, ...otherProps } = props
  const { session } = useSession()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      createResource("comments", { data: { postId, ...values } }),
  })
  const handleSubmit = async (values, { resetForm, validateForm }) => {
    try {
      const {
        data: {
          result: [comment],
        },
      } = await mutateAsync(values)

      setNewComments((prev) => [comment, ...prev])
    } catch (err) {
      return
    } finally {
      resetForm()
      validateForm(initialValues)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      <Form {...otherProps}>
        <section className="flex flex-col gap-2">
          <fieldset className="w-full">
            <FieldForm
              as="textarea"
              name="content"
              placeholder={`${session.user.firstName}, voulez-vous ajouter un nouveau commentaire ?`}
              noErrorMessage
              className="bg-transparent resize-none px-4 py-4 h-20 placeholder:text-neutral-400"
            />
          </fieldset>
          <SubmitButton disabled={isPending} className="w-fit self-end">
            {isPending ? "ENVOI DES DONNÉES" : "POSTER VOTRE COMMENTAIRE"}
          </SubmitButton>
        </section>
      </Form>
    </Formik>
  )
}

export default CommentForm
