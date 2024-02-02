import ManageQueryStatus from "@/components/ManageQueryStatus"
import Alert from "@/components/ui/alert/Alert"
import UsersTable from "@/components/ui/table/UsersTable"
import useUsers from "@/hooks/useUsers"
import { deleteResource, updateResource } from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"

const RetrieveUsers = (props) => {
  const { page } = props
  const { users, meta, isLoading, isError, error, refetch } = useUsers(page)
  const deleteUser = useMutation({
    mutationFn: ({ userId }) => deleteResource(["users", userId]),
    onSuccess: () => refetch(),
  })
  const disableUser = useMutation({
    mutationFn: ({ userId, disabled }) =>
      updateResource(["users", userId], { data: { disabled } }),
    onSuccess: () => refetch(),
  })

  if (isLoading || isError || users.length === 0) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        resource={users}
        alertMessage="Aucun utilisateur"
      />
    )
  }

  return (
    <UsersTable
      users={users}
      meta={meta}
      disableUser={disableUser}
      deleteUser={deleteUser}
    >
      {deleteUser.isSuccess && (
        <Alert className="w-fit mx-auto">Utilisateur supprimé</Alert>
      )}
      {disableUser.isSuccess && (
        <Alert className="w-fit mx-auto">Utilisateur mis à jour</Alert>
      )}
    </UsersTable>
  )
}

export default RetrieveUsers
