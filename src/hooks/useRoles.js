import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const useRoles = (isAdmin) => {
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: () => readResource("roles"),
    enabled: isAdmin,
  })
  const roles = query.data?.data.result || []
  const meta = query.data?.data.meta || {}

  return { roles, meta, ...query }
}

export default useRoles
