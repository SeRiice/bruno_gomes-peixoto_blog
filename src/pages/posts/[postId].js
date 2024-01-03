import Loading from "@/components/ui/Loading"
import PostCard from "@/components/ui/PostCard"
import ErrorAlert from "@/components/ui/alert/ErrorAlert"
import { idValidator } from "@/utils/validators"
import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

export const getServerSideProps = ({ query: { postId } }) => ({
  props: {
    postId: idValidator.required().validateSync(postId),
  },
})
const Post = (props) => {
  const { postId } = props
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => readResource(["posts", postId]),
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <ErrorAlert
        isError={isError}
        statusCode={error?.response.status}
        className="mx-auto"
        stayVisible
      />
    )
  }

  const {
    data: { result },
  } = data

  return (
    <div className="flex flex-col w-full gap-4 mb-4">
      {result.map((post) => {
        const { id } = post

        return <PostCard post={post} key={id} disabled />
      })}
    </div>
  )
}

export default Post
