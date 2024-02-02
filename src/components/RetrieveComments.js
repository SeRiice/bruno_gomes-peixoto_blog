import ManageQueryStatus from "@/components/ManageQueryStatus"
import Button from "@/components/ui/button/Button"
import CommentCard from "@/components/ui/card/CommentCard"
import useComments from "@/hooks/useComments"
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid"

const RetrieveComments = (props) => {
  const { date, postId, userId, newComments = [] } = props
  const { comments, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useComments(date, postId, userId)
  const handleClick = () => fetchNextPage()

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
