import BasicModel from "@/db/models/BasicModel"
import UserModel from "@/db/models/UserModel"

class RoleModel extends BasicModel {
  static tableName = "roles"

  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: BasicModel.HasManyRelation,
        join: {
          from: "roles.id",
          to: "users.roleId",
        },
      },
    }
  }
}

export default RoleModel
