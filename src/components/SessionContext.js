import { useRouter } from "next/router"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import jwt from "jsonwebtoken"
import config from "@/web/config"
import tokenExpired from "@/utils/tokenExpired"
import { deleteResource } from "@/web/services/api"

const SessionContext = createContext(null)

export const SessionContextProvider = (props) => {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const signIn = useCallback((token) => {
    localStorage.setItem(config.security.session.key, token)
    const { payload } = jwt.decode(token)
    setSession(payload)
    router.push("/")
  }, [])
  const signOut = useCallback(async () => {
    await deleteResource("sessions")
    localStorage.removeItem(config.security.session.key)
    setSession(null)
    router.push("/sign-in")
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(config.security.session.key)

    if (!token) {
      return
    }

    const { payload, exp } = jwt.decode(token)

    if (tokenExpired(exp)) {
      return
    }

    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider value={{ session, signIn, signOut }} {...props} />
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionContext
