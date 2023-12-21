import clsx from "clsx"

const variants = {
  none: "",
  fill: "bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-300 text-white",
  disabled: "bg-neutral-300 rounded-lg",
}
const Button = (props) => {
  const { variant = "none", className, ...otherProps } = props

  return (
    <button
      className={clsx(
        "p-3 rounded-lg font-medium ease-out duration-200",
        variants[variant],
        className,
      )}
      {...otherProps}
    />
  )
}

export default Button
