import clsx from "clsx"
import { Form as FormikForm } from "formik"

const variants = {
  none: "",
  sign: "flex flex-col gap-10 w-full max-w-sm p-8 shadow-lg shadow-neutral-200 border border-neutral-300 rounded-lg",
}
const Form = (props) => {
  const { className, variant = "none", children, ...otherProps } = props

  return (
    <FormikForm
      noValidate
      className={clsx(variants[variant], className)}
      {...otherProps}
    >
      {children}
    </FormikForm>
  )
}

export default Form
