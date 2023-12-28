import config from "@/web/config"

const tokenExpired = (seconds) => {
  const expired = seconds < Math.floor(Date.now() / 1000)

  if (expired) {
    localStorage.removeItem(config.security.session.key)
  }

  return expired
}

export default tokenExpired
