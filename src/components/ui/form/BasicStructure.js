import SubmitButton from "@/components/ui/button/SubmitButton"

const BasicStructure = (props) => {
  const { formTitle, buttonText, children } = props

  return (
    <>
      <h2 className="text-lg font-medium">{formTitle}</h2>
      <section className="flex flex-col w-full gap-6">
        <fieldset className="flex flex-col w-full gap-3">{children}</fieldset>
        <SubmitButton>{buttonText}</SubmitButton>
      </section>
    </>
  )
}

export default BasicStructure
