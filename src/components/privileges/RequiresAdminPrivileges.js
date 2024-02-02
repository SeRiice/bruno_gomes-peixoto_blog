import { useSession } from "@/components/SessionContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

const RequiresAdminPrivileges = (props) => {
  const { children } = props
  const { session, isLoading } = useSession()
  const router = useRouter()
  const hasAdminPrivileges = session && session.role.name === "ADMIN"

  useEffect(() => {
    if (!isLoading && !hasAdminPrivileges) {
      router.push("/")
    }
  }, [isLoading])

  return hasAdminPrivileges ? children : null
}

export default RequiresAdminPrivileges
