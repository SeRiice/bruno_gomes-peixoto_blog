import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const usePosts = (page, userId) => {
  const query = useQuery({
    queryKey: ["posts", page, userId],
    queryFn: () =>
      readResource("posts", { options: { params: { page, userId } } }),
  })
  const posts = query.data?.data.result || []
  const meta = query.data?.data.meta || {}

  return { posts, meta, ...query }
}

export default usePosts
