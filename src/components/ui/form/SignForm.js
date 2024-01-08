import Link from "@/components/ui/link/Link"
import SubmitButton from "@/components/ui/button/SubmitButton"
import Form from "@/components/ui/form/Form"

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
      <h2 className="text-lg font-medium">{formTitle}</h2>
      <section className="flex flex-col w-full gap-6">
        <fieldset className="flex flex-col w-full gap-3">{children}</fieldset>
        <SubmitButton>{buttonText}</SubmitButton>
      </section>
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
