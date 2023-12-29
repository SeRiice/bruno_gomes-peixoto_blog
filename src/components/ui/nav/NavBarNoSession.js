import Link from "@/components/ui/link/Link"
import NavBar from "@/components/ui/nav/NavBar"

const NavBarNoSession = () => (
  <NavBar>
    <Link href={"/sign-in"} variant="fill">
      Se connecter
    </Link>
    <Link href={"/sign-up"} variant="primary">
      {"S'inscrire"}
    </Link>
  </NavBar>
)

export default NavBarNoSession
