import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const usePost = (postId, params = {}) => {
  const query = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => readResource(["posts", postId], { options: { params } }),
    refetchOnWindowFocus: false,
  })
  const [post] = query.data?.data.result || [{}]

  return { post, ...query }
}

export default usePost
