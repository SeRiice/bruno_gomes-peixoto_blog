import ManageQueryStatus from "@/components/ManageQueryStatus"
import RetrieveComments from "@/components/RetrieveComments"
import { useSession } from "@/components/SessionContext"
import CommentCard from "@/components/ui/card/CommentCard"
import PostCard from "@/components/ui/card/PostCard"
import CommentForm from "@/components/ui/form/CommentForm"
import Link from "@/components/ui/link/Link"
import usePost from "@/hooks/usePost"
import { dateValidator, idValidator } from "@/utils/validators"
import { useState } from "react"

export const getServerSideProps = ({ query: { postId } }) => ({
  props: {
    date: dateValidator.validateSync().toISOString(),
    postId: idValidator.required().validateSync(postId),
  },
})
const Post = (props) => {
  const { date, postId } = props
  const { session } = useSession()
  const [newComments, setNewComments] = useState([])
  const { post, isLoading, isError, error } = usePost(postId)

  if (isLoading || isError) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    )
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <PostCard
        post={post}
        disabled
        edit={session && session.user.id === post.userId}
      />
      {session ? (
        <CommentForm postId={postId} setNewComments={setNewComments} />
      ) : (
        <p className="text-center">
          {"Tu souhaites ajouter un commentaire ? "}
          <span>
            <Link href="/sign-in" variant="primary">
              Connecte-toi
            </Link>
          </span>
        </p>
      )}
      <div className="flex flex-col gap-4">
        {newComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
        <RetrieveComments
          date={date}
          postId={postId}
          newComments={newComments}
        />
      </div>
    </div>
  )
}

export default Post
