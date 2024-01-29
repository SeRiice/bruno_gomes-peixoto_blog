import CheckPostOwner from "@/components/check/CheckPostOwner"
import RequiresAuthorPrivileges from "@/components/privileges/RequiresAuthorPrivileges"
import { idValidator } from "@/utils/validators"

export const getServerSideProps = ({ query: { postId } }) => ({
  props: {
    postId: idValidator.required().validateSync(postId),
  },
})
const EditPost = (props) => {
  const { postId } = props

  return (
    <RequiresAuthorPrivileges>
      <CheckPostOwner postId={postId} />
    </RequiresAuthorPrivileges>
  )
}

export default EditPost
