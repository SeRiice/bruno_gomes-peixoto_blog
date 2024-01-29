import { dateValidator } from "@/utils/validators"
import { readResource } from "@/web/services/api"
import { useInfiniteQuery } from "@tanstack/react-query"

const useComments = (postId, userId) => {
  const query = useInfiniteQuery({
    queryKey: ["comments", postId, userId],
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
    initialPageParam: dateValidator.validateSync(),
    getNextPageParam: (lastPage) => lastPage.data.meta.nextPage,
  })
  const comments = query.data?.pages.flatMap((page) => page.data.result) || []

  return { comments, ...query }
}

export default useComments
