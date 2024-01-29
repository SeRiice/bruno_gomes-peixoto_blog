import ManageQueryStatus from "@/components/ManageQueryStatus"
import { useSession } from "@/components/SessionContext"
import EditPostForm from "@/components/ui/form/post/EditPostForm"
import usePost from "@/hooks/usePost"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CheckPostOwner = (props) => {
  const { postId } = props
  const {
    session: { user },
  } = useSession()
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()
  const { post, isLoading, isError, error } = usePost(postId, { edit: true })

  useEffect(() => {
    if (isLoading || isError) {
      return
    }

    if (post.userId !== user.id) {
      router.push("/")

      return
    }

    setIsOwner(true)
  }, [isLoading])

  return isOwner ? (
    <EditPostForm post={post} />
  ) : (
    <ManageQueryStatus isLoading={isLoading} isError={isError} error={error} />
  )
}

export default CheckPostOwner
