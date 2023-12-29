import clsx from "clsx"
import { Children } from "react"

const NavBar = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <nav {...otherProps}>
      <ul className={clsx("flex items-stretch gap-3", className)}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
