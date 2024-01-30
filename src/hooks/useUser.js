import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const useUser = (userId, params = {}) => {
  const query = useQuery({
    queryKey: ["users", userId],
    queryFn: () => readResource(["users", userId], { options: { params } }),
    refetchOnWindowFocus: false,
  })
  const [user] = query.data?.data.result || [{}]
  const meta = query.data?.data.meta || {}

  return { user, meta, ...query }
}

export default useUser
