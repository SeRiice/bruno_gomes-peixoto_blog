import Loading from "@/components/ui/Loading"
import PostCard from "@/components/ui/PostCard"
import Alert from "@/components/ui/alert/Alert"
import Pagination from "@/components/ui/nav/Pagination"
import { pageValidator } from "@/utils/validators"
import { readResource } from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const Home = (props) => {
  const { page } = props
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => readResource("posts", { options: { params: { page } } }),
  })

  if (isLoading) {
    return <Loading />
  }

  const {
    data: {
      result,
      meta: { pages },
    },
  } = data

  if (result.length === 0) {
    return (
      <Alert className="mt-4 mx-auto" stayVisible>
        {"Il n'existe pas de posts pour la page donnée"}
      </Alert>
    )
  }

  return (
    <div className="flex flex-col w-full gap-8 mb-4">
      <div className="flex flex-col w-full gap-4">
        {result.map((post) => (
          <PostCard variant="truncate" post={post} key={post.id} />
        ))}
      </div>
      <Pagination pathname="/" page={page} pages={pages} />
    </div>
  )
}

export default Home
