import CheckIfUserIsAllowedToEditProfile from "@/components/check/CheckUserToEditProfile"
import { idValidator } from "@/utils/validators"

export const getServerSideProps = ({ query: { userId } }) => ({
  props: {
    userId: idValidator.required().validateSync(userId),
  },
})
const EditUser = (props) => {
  const { userId } = props

  return <CheckIfUserIsAllowedToEditProfile userId={userId} />
}

export default EditUser
