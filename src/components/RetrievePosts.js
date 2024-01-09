import ManageQueryStatus from "@/components/ManageQueryStatus"
import PostCard from "@/components/ui/card/PostCard"
import Pagination from "@/components/ui/nav/Pagination"
import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

const RetrievePosts = (props) => {
  const { page, userId, addPagination } = props
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page, userId],
    queryFn: () =>
      readResource("posts", { options: { params: { page, userId } } }),
  })
  const posts = data?.data.result || []
  const meta = data?.data.meta || {}

  if (isLoading || isError || posts.length === 0) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        resource={posts}
      />
    )
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col w-full gap-4">
        {posts.map((post) => (
          <PostCard variant="truncate" post={post} key={post.id} />
        ))}
      </div>
      {addPagination && (
        <Pagination meta={meta} pathname={addPagination.pathname} />
      )}
    </div>
  )
}

export default RetrievePosts
