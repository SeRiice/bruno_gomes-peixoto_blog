import clsx from "clsx"
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

const variants = {
  info: {
    icon: InformationCircleIcon,
    style: "bg-indigo-400 text-white",
  },
  error: {
    icon: ExclamationCircleIcon,
    style: "bg-red-500 text-white",
  },
}
const Alert = (props) => {
  const { children, variant = "info", className, ...otherProps } = props
  const [displayAlert, setDisplayAlert] = useState(true)
  const Icon = variants[variant].icon

  useEffect(() => {
    const timeoutId = setTimeout(() => setDisplayAlert(false), 2500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!displayAlert) {
    return null
  }

  return (
    <div
      className={clsx(
        "flex items-center gap-2 p-2 rounded-lg font-medium shadow-md shadow-neutral-200",
        variants[variant].style,
        className,
      )}
      {...otherProps}
    >
      <Icon className="w-6 h-6" />
      <span>{children}</span>
    </div>
  )
}

export default Alert
