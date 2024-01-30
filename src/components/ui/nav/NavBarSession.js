import { useSession } from "@/components/SessionContext"
import SignOutButton from "@/components/ui/button/SignOutButton"
import NavBar from "@/components/ui/nav/NavBar"
import {
  RectangleStackIcon,
  UserCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid"
import IconLink from "@/components/ui/link/IconLink"

const NavBarSession = () => {
  const {
    session: {
      user: { id },
      role: { name },
    },
  } = useSession()

  return (
    <NavBar>
      <IconLink checkPath href="/" Icon={RectangleStackIcon} text="Accueil" />
      {name === "ADMIN" && (
        <IconLink
          checkPath
          href="/admin"
          Icon={WrenchIcon}
          text="Administration"
        />
      )}
      {name !== "USER" && (
        <IconLink
          checkPath
          href="/createPost"
          Icon={PlusCircleIcon}
          text="Créer un post"
        />
      )}
      <IconLink
        checkPath
        href={`/users/${id}`}
        Icon={UserCircleIcon}
        text="Profil"
      />
      <SignOutButton />
    </NavBar>
  )
}

export default NavBarSession
