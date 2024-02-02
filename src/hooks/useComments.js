import { readResource } from "@/web/services/api"
import { useInfiniteQuery } from "@tanstack/react-query"

const useComments = (date, postId, userId) => {
  const query = useInfiniteQuery({
    queryKey: ["comments", date, postId, userId],
    queryFn: ({ pageParam }) =>
      readResource("comments", {
        options: {
          params: {
            lastCreatedAt: pageParam,
            postId,
            userId,
          },
        },
      }),
    initialPageParam: date,
    getNextPageParam: (lastPage) => lastPage.data.meta.nextPage,
  })
  const comments = query.data?.pages.flatMap((page) => page.data.result) || []

  return { comments, ...query }
}

export default useComments
