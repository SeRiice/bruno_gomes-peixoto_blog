import ManageQueryStatus from "@/components/ManageQueryStatus"
import { useSession } from "@/components/SessionContext"
import EditUserForm from "@/components/ui/form/EditUserForm"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CheckIfUserIsAllowedToEditProfile = (props) => {
  const { userId } = props
  const { session, isLoading: isLoadingSession } = useSession()
  const router = useRouter()
  const [isAllowed, setIsAllowed] = useState(false)
  const { user, isLoading, isError, error } = useUser(userId)

  useEffect(() => {
    if (isLoadingSession || isLoading || isError) {
      return
    }

    const isAdmin = session?.role.name === "ADMIN"

    if (!session || (session?.user.id !== user.id && !isAdmin)) {
      router.push("/")

      return
    }

    setIsAllowed(true)
  }, [isLoadingSession, isLoading])

  return isAllowed ? (
    <EditUserForm user={user} />
  ) : (
    <ManageQueryStatus isLoading={isLoading} isError={isError} error={error} />
  )
}

export default CheckIfUserIsAllowedToEditProfile
