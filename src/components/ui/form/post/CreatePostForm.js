import Alert from "@/components/ui/alert/Alert"
import ErrorAlert from "@/components/ui/alert/ErrorAlert"
import PostForm from "@/components/ui/form/post/PostForm"
import FieldForm from "@/components/ui/form/FieldForm"
import { contentValidator, titleValidator } from "@/utils/validators"
import { createResource } from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  title: "",
  content: "",
}
const validationSchema = object({
  title: titleValidator.required().label("Title"),
  content: contentValidator.required().label("Content"),
})
const CreatePostForm = () => {
  const { mutateAsync, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (values) => createResource("posts", { data: values }),
  })
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await mutateAsync(values)
    } catch (err) {
      return
    } finally {
      resetForm()
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      {isSuccess && <Alert>Post créé avec succès !</Alert>}
      <ErrorAlert isError={isError} statusCode={error?.response.status} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <PostForm
          formTitle="Saisissez les informations suivantes"
          buttonText={isPending ? "ENVOI DES DONNÉES..." : "CRÉER UN POST"}
        >
          <FieldForm name="title" label="TITRE"></FieldForm>
          <FieldForm
            name="content"
            as="textarea"
            label="CONTENU"
            className="h-60 resize-none"
          ></FieldForm>
        </PostForm>
      </Formik>
    </div>
  )
}

export default CreatePostForm
