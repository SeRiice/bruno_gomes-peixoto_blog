import Button from "@/components/ui/button/Button"
import IconLink from "@/components/ui/link/IconLink"
import formatDate from "@/utils/formatDate"
import {
  EyeIcon,
  NoSymbolIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid"

const Td = (props) => {
  const { children } = props

  return <td className="p-2">{children}</td>
}
const UserRow = (props) => {
  const { user, handleDisable, handleDelete, ...otherProps } = props

  return (
    <tr className="odd:bg-indigo-50 text-center" {...otherProps}>
      <Td>{user.id}</Td>
      <Td>{`${user.firstName} ${user.lastName}`}</Td>
      <Td>{user.role.name}</Td>
      <Td>{user.disabled ? "OUI" : "NON"}</Td>
      <Td>{formatDate(user.updatedAt)}</Td>
      <Td>
        <div className="flex justify-center gap-1">
          <IconLink href={`/users/${user.id}`} Icon={EyeIcon} />
          <IconLink href={`/users/${user.id}/edit`} Icon={PencilIcon} />
          <Button
            variant="icon"
            data-user-id={user.id}
            data-user-disabled={user.disabled}
            onClick={handleDisable}
            className="hover:text-yellow-500 hover:ring-yellow-500 active:text-yellow-300 active:ring-yellow-300"
          >
            <NoSymbolIcon className="w-4" />
          </Button>
          <Button
            variant="icon"
            data-user-id={user.id}
            onClick={handleDelete}
            className="hover:text-red-500 hover:ring-red-500 active:text-red-300 active:ring-red-300"
          >
            <TrashIcon className="w-4" />
          </Button>
        </div>
      </Td>
    </tr>
  )
}

export default UserRow
