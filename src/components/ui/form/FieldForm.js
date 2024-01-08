import clsx from "clsx"
import { Field, useField } from "formik"

const FieldForm = (props) => {
  const { name, label, className, noErrorMessage, ...otherProps } = props
  const [field, { error, touched }] = useField(name)
  const hasError = !noErrorMessage && touched && error

  return (
    <div className="flex flex-col gap-1">
      {label && <label className=" font-medium">{label}</label>}
      <Field
        name={name}
        className={clsx(
          "ring-1 ring-inset ring-neutral-300 rounded-lg px-2 py-1.5 focus:outline-indigo-400",
          hasError && "ring-red-500",
          className,
        )}
        {...field}
        {...otherProps}
      />
      {hasError && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default FieldForm
