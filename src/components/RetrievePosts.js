import ManageQueryStatus from "@/components/ManageQueryStatus"
import PostCard from "@/components/ui/card/PostCard"
import Pagination from "@/components/ui/nav/Pagination"
import usePosts from "@/hooks/usePosts"

const RetrievePosts = (props) => {
  const { page, userId, pathname } = props
  const { posts, meta, isLoading, isError, error } = usePosts(page, userId)

  if (isLoading || isError || posts.length === 0) {
    return (
      <ManageQueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        resource={posts}
        alertMessage="Aucun post"
      />
    )
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col w-full gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            truncate
            className="hover:cursor-pointer"
          />
        ))}
      </div>

      <Pagination meta={meta} pathname={pathname} />
    </div>
  )
}

export default RetrievePosts
