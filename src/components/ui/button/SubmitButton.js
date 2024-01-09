import Button from "@/components/ui/button/Button"
import { useFormikContext } from "formik"

const SubmitButton = (props) => {
  const { disabled, ...otherProps } = props
  const { isValid, isSubmitting } = useFormikContext()
  const isDisabled = disabled || !isValid || isSubmitting

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      variant={!isDisabled ? "fill" : "disabled"}
      {...otherProps}
    />
  )
}

export default SubmitButton
