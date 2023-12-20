import Link from "@/components/ui/Link"
import clsx from "clsx"
import { useRouter } from "next/router"

const Layout = (props) => {
  const { children, className, ...otherProps } = props
  const router = useRouter()

  return (
    <div
      className={clsx(
        "flex flex-col w-full min-h-screen items-center bg-neutral-50 font-poppins text-sm",
        className,
      )}
      {...otherProps}
    >
      <div className="w-full shadow">
        <div className="flex mx-auto p-3 justify-between items-center max-w-3xl">
          <Link href={"/"} variant="logo">
            bloggy
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href={"/sign-in"} variant="fill">
                  {"Se connecter"}
                </Link>
              </li>
              <li>
                <Link href={"/sign-up"} variant="primary">
                  {"S'inscrire"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <main
        className={clsx("flex w-full max-w-3xl px-4 my-8", {
          grow:
            router.pathname === "/sign-in" || router.pathname === "/sign-up",
        })}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
