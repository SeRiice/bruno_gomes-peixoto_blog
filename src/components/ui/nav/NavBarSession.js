import { useSession } from "@/components/SessionContext"
import SignOutButton from "@/components/ui/button/SignOutButton"
import NavBar from "@/components/ui/nav/NavBar"
import { RectangleStackIcon, UserCircleIcon } from "@heroicons/react/16/solid"
import IconLink from "@/components/ui/link/IconLink"

const NavBarSession = () => {
  const {
    session: {
      user: { id },
    },
  } = useSession()

  return (
    <NavBar>
      <IconLink href="/" Icon={RectangleStackIcon} text="Accueil" />
      <IconLink href={`/users/${id}`} Icon={UserCircleIcon} text="Profil" />
      <SignOutButton />
    </NavBar>
  )
}

export default NavBarSession
