import StatsBar from "@/components/ui/StatsBar"
import Card, {
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/ui/card/Card"
import IconLink from "@/components/ui/link/IconLink"
import Link from "@/components/ui/link/Link"
import { PencilIcon } from "@heroicons/react/16/solid"
import { useRouter } from "next/router"

const PostCard = (props) => {
  const { post, disabled, truncate, edit, className } = props
  const { user } = post
  const router = useRouter()
  const handleClick = (event) => {
    if (disabled) {
      return
    }

    const route = event.currentTarget.getAttribute("data-route")
    router.push(route)
  }
  const handleLinkPropagation = (event) => event.stopPropagation()

  return (
    <Card
      onClick={handleClick}
      data-route={`/posts/${post.id}`}
      disabled={disabled}
      className={className}
    >
      <CardHeader date={post.createdAt}>
        <Link
          href={`/users/${user.id}`}
          onClick={handleLinkPropagation}
          variant="primary"
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
      </CardHeader>
      <CardBody title={post.title} content={post.content} truncate={truncate} />
      <CardFooter>
        <StatsBar totalVisits={String(post.visits)} />
        {edit && (
          <IconLink
            href={`/posts/${post.id}/edit`}
            onClick={handleLinkPropagation}
            Icon={PencilIcon}
          />
        )}
      </CardFooter>
    </Card>
  )
}

export default PostCard
