import StatsBar from "@/components/ui/StatsBar"
import Card, { CardHeader } from "@/components/ui/card/Card"
import IconLink from "@/components/ui/link/IconLink"
import Link from "@/components/ui/link/Link"
import { PencilIcon } from "@heroicons/react/16/solid"

const UserCard = (props) => {
  const { user, meta, edit, tab } = props

  return (
    <Card disabled className="pb-0 gap-8">
      <div className="flex flex-col gap-2">
        <CardHeader>
          <p className="font-medium text-lg text-indigo-400">
            {`${user.firstName} ${user.lastName}`}
          </p>
          {edit && (
            <IconLink href={`/users/${user.id}/edit`} Icon={PencilIcon} />
          )}
        </CardHeader>
        <StatsBar
          totalPosts={meta.postsCount}
          totalComments={meta.commentsCount}
          totalVisits={String(meta.totalVisits)}
        />
      </div>

      <div className="flex gap-4 font-medium">
        <Link
          variant={tab === "posts" ? "tabBorder" : "tab"}
          href={{
            pathname: `/users/${user.id}`,
            query: { tab: "posts" },
          }}
        >
          POSTS
        </Link>
        <Link
          variant={tab === "comments" ? "tabBorder" : "tab"}
          href={{
            pathname: `/users/${user.id}`,
            query: { tab: "comments" },
          }}
        >
          COMMENTAIRES
        </Link>
      </div>
    </Card>
  )
}

export default UserCard
