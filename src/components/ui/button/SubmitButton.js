import Button from "@/components/ui/button/Button"
import { useFormikContext } from "formik"

const SubmitButton = (props) => {
  const { disabled, ...otherProps } = props
  const { isValid } = useFormikContext()
  const isDisabled = disabled || !isValid

  return (
    <Button
      disabled={isDisabled}
      variant={!isDisabled ? "fill" : "disabled"}
      {...otherProps}
    />
  )
}

export default SubmitButton
