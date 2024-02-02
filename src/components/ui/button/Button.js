import clsx from "clsx"

const variants = {
  none: "",
  signOut:
    "flex h-full items-center gap-1 px-2 py-1.5 ring-1 ring-inset ring-neutral-300 bg-neutral-100 text-neutral-400 hover:bg-red-500 hover:text-white hover:ring-0 active:bg-red-400 active:ring-0",
  fill: "bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-300 text-white",
  icon: "flex h-full ring-1 ring-inset px-1.5 py-1.5 ring-neutral-300 bg-neutral-100 text-neutral-400",
  disabled: "bg-neutral-300 rounded-lg",
}
const Button = (props) => {
  const { variant = "none", className, ...otherProps } = props

  return (
    <button
      className={clsx(
        variants[variant],
        {
          "p-3 rounded-lg font-medium ease-out duration-200":
            variant !== "none",
        },
        className,
      )}
      {...otherProps}
    />
  )
}

export default Button
