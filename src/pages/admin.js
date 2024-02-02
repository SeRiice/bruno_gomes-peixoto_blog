import RetrieveUsers from "@/components/RetrieveUsers"
import RequiresAdminPrivileges from "@/components/privileges/RequiresAdminPrivileges"

import { pageValidator } from "@/utils/validators"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.required().validateSync(page),
  },
})
const Admin = (props) => {
  const { page } = props

  return (
    <RequiresAdminPrivileges>
      <RetrieveUsers page={page} />
    </RequiresAdminPrivileges>
  )
}

export default Admin
