import Button from "@/components/ui/button/Button"

const DeletePopUp = (props) => {
  const { onCancel, onValidate } = props

  return (
    <div className="fixed top-0 left-0 flex w-full h-full justify-center items-center bg-neutral-50 bg-opacity-70 backdrop-blur-sm">
      <div className="flex flex-col gap-12 p-8 rounded-lg shadow-lg shadow-neutral-200 border border-neutral-300  bg-neutral-50">
        <div>
          <p className="text-lg font-medium">
            {"Êtes-vous sûr de vouloir supprimer cet enregistrement ?"}
          </p>
          <p className="italic font-light text-center">
            {"Attention ! Cette action est irréversible."}
          </p>
        </div>
        <div className="flex mx-auto gap-2">
          <Button variant="fill" onClick={onValidate}>
            OUI
          </Button>
          <Button variant="fill" onClick={onCancel}>
            NON
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopUp
