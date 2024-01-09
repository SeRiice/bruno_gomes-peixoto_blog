import SubmitButton from "@/components/ui/button/SubmitButton"
import Form from "@/components/ui/form/Form"

const PostForm = (props) => {
  const { children, formTitle, buttonText, className, ...otherProps } = props

  return (
    <Form variant="post" className={className} {...otherProps}>
      <h2 className="text-lg font-medium">{formTitle}</h2>
      <section className="flex flex-col w-full gap-6">
        <fieldset className="flex flex-col w-full gap-3">{children}</fieldset>
        <SubmitButton>{buttonText}</SubmitButton>
      </section>
    </Form>
  )
}

export default PostForm
