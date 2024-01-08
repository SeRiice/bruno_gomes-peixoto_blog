import ManageQueryStatus from "@/components/ManageQueryStatus"
import RetrieveComments from "@/components/RetrieveComments"
import { useSession } from "@/components/SessionContext"
import CommentCard from "@/components/ui/card/CommentCard"
import PostCard from "@/components/ui/card/PostCard"
import CommentForm from "@/components/ui/form/CommentForm"
import Link from "@/components/ui/link/Link"
import { idValidator } from "@/utils/validators"
import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const getServerSideProps = ({ query: { postId } }) => ({
  props: {
    postId: idValidator.required().validateSync(postId),
  },
})
const Post = (props) => {
  const { postId } = props
  const { session } = useSession()
  const [newComments, setNewComments] = useState([])
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => readResource(["posts", postId]),
    refetchOnWindowFocus: false,
  })

  if (isLoading || isError) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    )
  }

  const result = data?.data.result || []

  return (
    <div className="flex flex-col w-full gap-8 mb-4">
      {result.map((post) => (
        <PostCard post={post} key={post.id} disabled />
      ))}

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
          <CommentCard comment={comment} key={comment.id} />
        ))}
        <RetrieveComments postId={postId} newComments={newComments} />
      </div>
    </div>
  )
}

export default Post
