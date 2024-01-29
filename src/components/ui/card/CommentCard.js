import Card, { CardBody, CardHeader } from "@/components/ui/card/Card"
import Link from "@/components/ui/link/Link"

const CommentCard = (props) => {
  const { comment } = props
  const { user } = comment

  return (
    <Card>
      <CardHeader date={comment.createdAt}>
        <Link href={`/users/${user.id}`} variant="primary">
          {`${user.firstName} ${user.lastName}`}
        </Link>
      </CardHeader>
      <CardBody content={comment.content} />
    </Card>
  )
}

export default CommentCard
