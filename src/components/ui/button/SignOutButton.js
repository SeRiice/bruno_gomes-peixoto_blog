import { useSession } from "@/components/SessionContext"
import Button from "@/components/ui/button/Button"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid"

const SignOutButton = () => {
  const { signOut } = useSession()
  const handleClick = () => signOut()

  return (
    <Button onClick={handleClick} variant="signOut">
      <ArrowLeftStartOnRectangleIcon className="w-4" />
      <span>Se déconnecter</span>
    </Button>
  )
}

export default SignOutButton
