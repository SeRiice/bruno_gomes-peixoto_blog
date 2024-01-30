/* eslint-disable max-lines-per-function */
import ManageQueryStatus from "@/components/ManageQueryStatus"
import RetrieveComments from "@/components/RetrieveComments"
import RetrievePosts from "@/components/RetrievePosts"
import { useSession } from "@/components/SessionContext"
import UserCard from "@/components/ui/card/UserCard"
import useUser from "@/hooks/useUser"
import { idValidator, pageValidator, tabValidator } from "@/utils/validators"

export const getServerSideProps = ({ query: { userId, page, tab } }) => ({
  props: {
    userId: idValidator.required().validateSync(userId),
    page: pageValidator.required().validateSync(page),
    tab: tabValidator.required().validateSync(tab),
  },
})
const User = (props) => {
  const { userId, page, tab } = props
  const { session } = useSession()
  const { user, meta, isLoading, isError, error } = useUser(userId)

  if (isLoading || isError) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        resource={user}
      />
    )
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <UserCard
        user={user}
        meta={meta}
        edit={session && session.user.id === user.id}
        tab={tab}
      />

      {tab === "posts" && (
        <RetrievePosts
          page={page}
          userId={userId}
          pathname={`/users/${userId}`}
        />
      )}

      {tab === "comments" && (
        <div className="flex flex-col gap-4">
          <RetrieveComments userId={userId} />
        </div>
      )}
    </div>
  )
}

export default User
