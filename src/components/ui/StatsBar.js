import {
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid"

const StatIcon = (props) => {
  const { Icon, stat } = props

  return (
    <div className="flex items-center gap-1">
      <Icon className="w-4 h-4" />
      <span className="font-medium">{stat}</span>
    </div>
  )
}
const StatsBar = (props) => {
  const { totalPosts, totalComments, totalVisits } = props

  return (
    <div className="flex gap-4">
      {totalPosts && <StatIcon Icon={RectangleStackIcon} stat={totalPosts} />}
      {totalComments && (
        <StatIcon Icon={ChatBubbleBottomCenterTextIcon} stat={totalComments} />
      )}
      {totalVisits && <StatIcon Icon={EyeIcon} stat={totalVisits} />}
    </div>
  )
}

export default StatsBar
