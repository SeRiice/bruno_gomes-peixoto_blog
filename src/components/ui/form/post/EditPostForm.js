import FieldForm from "@/components/ui/form/FieldForm"
import PostForm from "@/components/ui/form/post/PostForm"
import { contentValidator, titleValidator } from "@/utils/validators"
import { updateResource } from "@/web/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const validationSchema = object({
  title: titleValidator.required().label("Title"),
  content: contentValidator.required().label("Content"),
})
const EditPostForm = (props) => {
  const { post } = props
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      updateResource(["posts", post.id], { data: values }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["posts", post.id],
        exact: true,
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
        initialValues={{ title: post.title, content: post.content }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <PostForm
          formTitle="Modifier les informations suivantes"
          buttonText={isPending ? "ENVOI DES DONNÉES" : "MODIFIER LE POST"}
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

export default EditPostForm
