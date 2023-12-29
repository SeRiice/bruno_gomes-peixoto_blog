import { useSession } from "@/components/SessionContext"
import Link from "@/components/ui/link/Link"
import NavBarNoSession from "@/components/ui/nav/NavBarNoSession"
import NavBarSession from "@/components/ui/nav/NavBarSession"
import clsx from "clsx"
import { useRouter } from "next/router"

const Layout = (props) => {
  const { children, className, ...otherProps } = props
  const router = useRouter()
  const { session } = useSession()

  return (
    <div
      className={clsx(
        "flex flex-col w-full min-h-screen items-center bg-neutral-50 font-poppins text-sm text-black",
        className,
      )}
      {...otherProps}
    >
      <div className="w-full shadow sticky top-0 bg-neutral-50 ">
        <div className="flex mx-auto p-3 justify-between items-center max-w-3xl">
          <Link href={"/"} variant="logo">
            bloggy
          </Link>
          {session ? <NavBarSession /> : <NavBarNoSession />}
        </div>
      </div>
      <main
        className={clsx("flex w-full max-w-3xl px-3 my-4", {
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
