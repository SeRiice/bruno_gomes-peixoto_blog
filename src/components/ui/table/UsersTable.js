import DeletePopUp from "@/components/ui/DeletePopUp"
import Pagination from "@/components/ui/nav/Pagination"
import UserRow from "@/components/ui/table/UserRow"
import { useCallback, useState } from "react"

const tableHeaders = [
  "ID",
  "NOM COMPLET",
  "RÔLE",
  "DÉSACTIVÉ",
  "MODIFIÉ LE",
  "ACTIONS",
]
const Table = (props) => {
  const { children } = props

  return (
    <table className="w-full rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
      <thead className="text-center">
        <tr className="bg-indigo-400 text-white">
          {tableHeaders.map((header) => (
            <th key={header} className="font-medium p-4">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}
const UsersTable = (props) => {
  const { users, meta, disableUser, deleteUser, children } = props
  const [showPopUp, setShowPopUp] = useState(false)
  const [userId, setUserId] = useState(null)
  const onCancel = () => setShowPopUp(false)
  const onValidate = () => {
    deleteUser.mutate({ userId })
    setShowPopUp(false)
  }
  const handleDelete = useCallback((event) => {
    const id = parseInt(event.currentTarget.getAttribute("data-user-id"), 10)
    setShowPopUp(() => true)
    setUserId(() => id)
  }, [])
  const handleDisable = useCallback((event) => {
    const id = parseInt(event.currentTarget.getAttribute("data-user-id"), 10)
    const disabled = JSON.parse(
      event.currentTarget.getAttribute("data-user-disabled"),
    )

    disableUser.mutate({
      userId: id,
      disabled: !disabled,
    })
  }, [])

  return (
    <div className="flex flex-col w-full gap-8 justify-center">
      {children}
      {showPopUp && <DeletePopUp onCancel={onCancel} onValidate={onValidate} />}
      <Table>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            handleDisable={handleDisable}
            handleDelete={handleDelete}
          />
        ))}
      </Table>
      <Pagination meta={meta} pathname="/admin" />
    </div>
  )
}

export default UsersTable
