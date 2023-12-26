import config from "@/api/config"
import BasicModel from "@/db/models/BasicModel"
import RoleModel from "@/db/models/RoleModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"
import CommentModel from "@/db/models/CommentModel"
import knex from "knex"

const createContext = ({ req, res, next }) => {
  const send = (result, meta = {}) => {
    res.send({ result: Array.isArray(result) ? result : [result], meta })
  }
  const db = knex(config.db)
  BasicModel.knex(db)

  return {
    req,
    res,
    next,
    send,
    db,
    models: {
      RoleModel,
      UserModel,
      PostModel,
      CommentModel,
    },
  }
}

export default createContext
