import Link from "@/components/ui/link/Link"
import clsx from "clsx"
import { useRouter } from "next/router"

const IconLink = (props) => {
  const { href, Icon, text, ...otherProps } = props
  const { asPath } = useRouter()
  const [path] = asPath.split("?")

  return (
    <Link
      href={href}
      className={clsx(
        "flex h-full ring-1 ring-inset rounded-lg ease-out duration-200",
        path === href
          ? "gap-1 font-medium items-center px-2 py-1.5 ring-indigo-400 bg-indigo-50/30 text-indigo-400"
          : "p-1.5 ring-neutral-300 bg-neutral-100 text-neutral-400 hover:text-indigo-400 hover:ring-indigo-400",
      )}
      {...otherProps}
    >
      <Icon className="w-4" />
      {path === href && <span>{text}</span>}
    </Link>
  )
}

export default IconLink
