import ManageQueryStatus from "@/components/ManageQueryStatus"
import Button from "@/components/ui/button/Button"
import CommentCard from "@/components/ui/card/CommentCard"
import { dateValidator } from "@/utils/validators"
import { readResource } from "@/web/services/api"
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid"
import { useInfiniteQuery } from "@tanstack/react-query"

const RetrieveComments = (props) => {
  const { postId, userId, newComments = [] } = props
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["comments", postId],
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
  const handleClick = () => fetchNextPage()
  const comments = data?.pages.flatMap((page) => page.data.result) || []

  if (
    isLoading ||
    isError ||
    (comments.length === 0 && newComments.length === 0)
  ) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        resource={comments}
        alertMessage="Aucun commentaire"
      />
    )
  }

  return (
    <>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
      {hasNextPage && (
        <Button variant="none" className="w-fit mx-auto" onClick={handleClick}>
          <ArrowDownCircleIcon className="w-6 h-6 text-neutral-400 hover:text-indigo-400 active:text-indigo-300 ease-out duration-200" />
        </Button>
      )}
    </>
  )
}

export default RetrieveComments
