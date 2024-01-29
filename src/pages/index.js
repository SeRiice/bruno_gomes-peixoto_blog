import { pageValidator } from "@/utils/validators"
import RetrievePosts from "@/components/RetrievePosts"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const Home = (props) => {
  const { page } = props

  return <RetrievePosts page={page} pathname="/" />
}

export default Home
