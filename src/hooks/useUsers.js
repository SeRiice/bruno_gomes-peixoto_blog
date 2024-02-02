import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const useUsers = (page) => {
  const query = useQuery({
    queryKey: ["users", page],
    queryFn: () => readResource("users", { options: { params: { page } } }),
  })
  const users = query.data?.data.result || []
  const meta = query.data?.data.meta || {}

  return { users, meta, ...query }
}

export default useUsers
