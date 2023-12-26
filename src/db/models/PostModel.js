import BasicModel from "@/db/models/BasicModel"
import UserModel from "@/db/models/UserModel"

class PostModel extends BasicModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BasicModel.BelongsToOneRelation,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default PostModel
