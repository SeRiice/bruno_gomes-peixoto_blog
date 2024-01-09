import { useSession } from "@/components/SessionContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

const RequiresAuthorPrivileges = (props) => {
  const { children } = props
  const { session, isLoading } = useSession()
  const router = useRouter()
  const hasAuthorPrivileges = session && session.role.name !== "USER"

  useEffect(() => {
    if (!isLoading && !hasAuthorPrivileges) {
      router.push("/")
    }
  }, [isLoading])

  return hasAuthorPrivileges ? children : null
}

export default RequiresAuthorPrivileges
