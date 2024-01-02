import Link from "@/components/ui/link/Link"
import formatDate from "@/utils/formatDate"
import clsx from "clsx"
import { useRouter } from "next/router"

const variants = {
  none: "",
  truncate: "line-clamp-3",
}
const PostCard = (props) => {
  const { post, variant = "none", disabled, className, ...otherProps } = props
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
    <article
      onClick={handleClick}
      data-route={`posts/${post.id}`}
      className={clsx(
        "flex flex-col shadow-md shadow-neutral-200 gap-4 border border-neutral-300 rounded-lg p-4",
        !disabled &&
          "hover:bg-indigo-50/30 hover:border-indigo-400 hover:cursor-pointer ease-out duration-200",
        className,
      )}
      {...otherProps}
    >
      <div className="flex justify-between items-center">
        <Link
          href={`users/${user.id}`}
          onClick={handleLinkPropagation}
          variant="primary"
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <h2 className="text-base font-medium">{post.title}</h2>
      <p className={clsx("whitespace-pre-wrap break-words", variants[variant])}>
        {post.content}
      </p>
    </article>
  )
}

export default PostCard
