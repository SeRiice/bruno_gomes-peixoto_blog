import Link from "@/components/ui/link/Link"
import SubmitButton from "@/components/ui/button/SubmitButton"
import clsx from "clsx"
import { Form, Formik } from "formik"

const SignForm = (props) => {
  const {
    children,
    initialValues,
    validationSchema,
    onSubmit,
    formTitle,
    buttonText,
    linkInfo,
    className,
    ...otherProps
  } = props

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...otherProps}
    >
      <Form
        noValidate
        className={clsx(
          "flex flex-col gap-10 w-full max-w-sm p-8 shadow-lg shadow-neutral-200 border border-neutral-300 rounded-lg",
          className,
        )}
      >
        <h2 className="text-lg font-medium">{formTitle}</h2>
        <section className="flex flex-col w-full gap-6">
          <fieldset className="flex flex-col w-full gap-3">{children}</fieldset>
          <SubmitButton type="submit">{buttonText}</SubmitButton>
        </section>
        <p className="text-xs">
          {linkInfo.text}
          <Link href={linkInfo.href} variant="primary">
            {` ${linkInfo.hrefText}`}
          </Link>
        </p>
      </Form>
    </Formik>
  )
}

export default SignForm
