import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  contentValidator,
  dateValidator,
  idValidator,
} from "@/utils/validators"
import jwt from "jsonwebtoken"

const handlers = mw({
  POST: [
    auth,
    validate({
      body: {
        content: contentValidator.required(),
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      req,
      models: { CommentModel },
      input: {
        body: { content, postId },
      },
    }) => {
      const { authorization } = req.headers
      const {
        payload: {
          user: { id: userId },
        },
      } = jwt.decode(authorization)
      const comment = await CommentModel.query()
        .insertAndFetch({
          content,
          postId,
          userId,
        })
        .withGraphFetched("user(restrictSelection)")

      send(comment)
    },
  ],
  GET: [
    validate({
      query: {
        lastCreatedAt: dateValidator.required(),
        postId: idValidator,
        userId: idValidator,
      },
    }),
    async ({
      send,
      models: { CommentModel },
      input: {
        query: { lastCreatedAt, postId, userId },
      },
    }) => {
      const {
        pagination: { limit },
      } = config
      const results = await CommentModel.query()
        .where("createdAt", "<", lastCreatedAt)
        .where(postId ? { postId } : true)
        .where(userId ? { userId } : true)
        .limit(limit)
        .withGraphFetched("user(restrictSelection)")
        .orderBy("createdAt", "desc")

      if (results.length !== limit) {
        send(results, { nextPage: null })

        return
      }

      const lastIndex = results.length - 1
      const lastComment = results[lastIndex]
      const [{ count }] = await CommentModel.query()
        .where("createdAt", "<", lastComment.createdAt)
        .where(postId ? { postId } : true)
        .where(userId ? { userId } : true)
        .count()

      send(results, { nextPage: count > 0 ? lastComment.createdAt : null })
    },
  ],
})

export default handlers
