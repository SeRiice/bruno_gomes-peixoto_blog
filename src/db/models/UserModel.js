import BasicModel from "@/db/models/BasicModel"
import RoleModel from "@/db/models/RoleModel"

class UserModel extends BasicModel {
  static tableName = "users"

  static modifiers = {
    restrictSelection(query) {
      query.select("id", "firstName", "lastName")
    },
  }

  static get relationMappings() {
    return {
      role: {
        modelClass: RoleModel,
        relation: BasicModel.BelongsToOneRelation,
        join: {
          from: "users.roleId",
          to: "roles.id",
        },
      },
    }
  }
}

export default UserModel
