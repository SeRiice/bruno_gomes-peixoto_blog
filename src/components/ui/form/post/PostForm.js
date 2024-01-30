import BasicStructure from "@/components/ui/form/BasicStructure"
import Form from "@/components/ui/form/Form"

const PostForm = (props) => {
  const { children, formTitle, buttonText, className, ...otherProps } = props

  return (
    <Form variant="post" className={className} {...otherProps}>
      <BasicStructure formTitle={formTitle} buttonText={buttonText}>
        {children}
      </BasicStructure>
    </Form>
  )
}

export default PostForm
