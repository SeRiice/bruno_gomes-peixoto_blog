import clsx from "clsx"
import { Form as FormikForm } from "formik"

const variants = {
  none: "",
  sign: "max-w-sm",
  post: "max-w-lg",
  user: "max-w-sm",
}
const Form = (props) => {
  const { className, variant = "none", children, ...otherProps } = props

  return (
    <FormikForm
      noValidate
      className={clsx(
        variants[variant],
        {
          "flex flex-col gap-10 w-full p-8 shadow-lg shadow-neutral-200 border border-neutral-300 rounded-lg":
            variants[variant],
        },
        className,
      )}
      {...otherProps}
    >
      {children}
    </FormikForm>
  )
}

export default Form
