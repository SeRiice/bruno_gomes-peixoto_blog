import Link from "@/components/ui/link/Link"
import Form from "@/components/ui/form/Form"
import BasicStructure from "@/components/ui/form/BasicStructure"

const SignForm = (props) => {
  const {
    children,
    formTitle,
    buttonText,
    linkInfo,
    className,
    ...otherProps
  } = props

  return (
    <Form variant="sign" className={className} {...otherProps}>
      <BasicStructure formTitle={formTitle} buttonText={buttonText}>
        {children}
      </BasicStructure>
      <p className="text-xs">
        {linkInfo.text}
        <Link href={linkInfo.href} variant="primary">
          {` ${linkInfo.hrefText}`}
        </Link>
      </p>
    </Form>
  )
}

export default SignForm
