import formatDate from "@/utils/formatDate"
import clsx from "clsx"

export const CardHeader = (props) => {
  const { children, date } = props

  return (
    <div className="flex justify-between items-center">
      {children}
      {date && <span>{formatDate(date)}</span>}
    </div>
  )
}
export const CardBody = (props) => {
  const { title, content, truncate } = props

  return (
    <div className="flex flex-col gap-2">
      {title && <h2 className="text-base font-medium">{title}</h2>}
      {content && (
        <p
          className={clsx("whitespace-pre-wrap break-words", {
            "line-clamp-3": truncate,
          })}
        >
          {content}
        </p>
      )}
    </div>
  )
}
export const CardFooter = (props) => {
  const { children } = props

  return <div className="flex justify-between items-end">{children}</div>
}
const Card = (props) => {
  const { children, disabled, className, ...otherProps } = props

  return (
    <article
      className={clsx(
        "flex flex-col shadow-md shadow-neutral-200 gap-4 border border-neutral-300 rounded-lg p-4",
        !disabled &&
          "hover:bg-indigo-50/30 hover:border-indigo-400 ease-out duration-200",
        className,
      )}
      {...otherProps}
    >
      {children}
    </article>
  )
}

export default Card
