import clsx from "clsx"
import NextLink from "next/link"

const variants = {
  primary:
    "font-medium text-indigo-400 hover:text-indigo-500 active:text-indigo-200",
  fill: "font-medium px-3 py-1.5 rounded-lg text-white bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-300",
  logo: "text-3xl font-gluten font-extrabold active:tracking-widest",
  tabBorder: "pb-4 border-b-2 border-indigo-400",
  tab: "pb-4 hover:border-b-2 hover:border-indigo-400",
  none: "",
}
const Link = (props) => {
  const { className, variant = "none", ...otherProps } = props

  return (
    <NextLink
      className={clsx(
        variants[variant],
        {
          "ease-out duration-200": variant !== "none",
        },
        className,
      )}
      {...otherProps}
    />
  )
}

export default Link
