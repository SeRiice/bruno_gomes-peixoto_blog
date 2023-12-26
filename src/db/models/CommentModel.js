import BasicModel from "@/db/models/BasicModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"

class CommentModel extends BasicModel {
  static tableName = "comments"

  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BasicModel.BelongsToOneRelation,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      post: {
        modelClass: PostModel,
        relation: BasicModel.BelongsToOneRelation,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel
