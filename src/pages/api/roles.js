import adminPrivileges from "@/api/middlewares/adminPrivileges"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handlers = mw({
  GET: [
    auth,
    adminPrivileges,
    async ({ send, models: { RoleModel } }) => {
      const roles = await RoleModel.query()

      send(roles)
    },
  ],
})

export default handlers
