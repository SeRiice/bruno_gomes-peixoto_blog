import Link from "@/components/ui/link/Link"
import formatDate from "@/utils/formatDate"
import clsx from "clsx"

const CommentCard = (props) => {
  const { comment, ...otherProps } = props
  const { user } = comment

  return (
    <article
      className={clsx(
        "flex flex-col shadow-md shadow-neutral-200 gap-4 border border-neutral-300 rounded-lg p-4",
        "hover:bg-indigo-50/30 hover:border-indigo-400 ease-out duration-200",
      )}
      {...otherProps}
    >
      <div className="flex justify-between items-center">
        <Link href={`/users/${user.id}`} variant="primary">
          {`${user.firstName} ${user.lastName}`}
        </Link>
        <span>{formatDate(comment.createdAt)}</span>
      </div>
      <p className="whitespace-pre-wrap break-words">{comment.content}</p>
    </article>
  )
}

export default CommentCard
