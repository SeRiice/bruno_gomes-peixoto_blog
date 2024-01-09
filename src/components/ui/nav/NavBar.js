import clsx from "clsx"
import { Children } from "react"

const variants = {
  stretch: "items-stretch",
  center: "items-center justify-center",
}
const NavBar = (props) => {
  const { children, variant = "stretch", className, ...otherProps } = props

  return (
    <nav {...otherProps}>
      <ul className={clsx("flex gap-3", variants[variant], className)}>
        {Children.map(children, (child) => child && <li>{child}</li>)}
      </ul>
    </nav>
  )
}

export default NavBar
