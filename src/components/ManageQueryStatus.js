import Alert from "@/components/ui/alert/Alert"
import ErrorAlert from "@/components/ui/alert/ErrorAlert"

const ManageQueryStatus = (props) => {
  const { isLoading, isError, error, resource } = props
  const isResourceEmpty =
    !isLoading && !isError && resource && resource.length === 0

  return (
    <div className="w-fit mx-auto mt-4">
      {isLoading && (
        <div className="animate-bounce">Chargement des données...</div>
      )}
      {isError && (
        <ErrorAlert
          isError={isError}
          statusCode={error?.response.status}
          stayVisible
        />
      )}
      {isResourceEmpty && (
        <Alert stayVisible>La ressource demandée est inexistante</Alert>
      )}
    </div>
  )
}

export default ManageQueryStatus
