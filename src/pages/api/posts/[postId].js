import { HttpForbiddenError } from "@/api/errors/errors"
import addNewVisit from "@/api/middlewares/addNewVisit"
import auth from "@/api/middlewares/auth"
import authorPrivileges from "@/api/middlewares/authorPrivileges"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  contentValidator,
  editValidator,
  idValidator,
  titleValidator,
} from "@/utils/validators"
import jwt from "jsonwebtoken"

const handlers = mw({
  GET: [
    validate({
      query: { postId: idValidator.required(), edit: editValidator.required() },
    }),
    async ({
      send,
      models: { PostModel },
      input: {
        query: { postId },
      },
      next,
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("user(restrictSelection)")
        .throwIfNotFound()

      send(post)

      await next()
    },
    addNewVisit,
  ],
  PATCH: [
    auth,
    authorPrivileges,
    validate({
      query: { postId: idValidator.required() },
      body: {
        title: titleValidator,
        content: contentValidator,
      },
    }),
    async ({
      send,
      req,
      models: { PostModel },
      input: {
        query: { postId },
        body: { title, content },
      },
    }) => {
      const { authorization } = req.headers
      const {
        payload: {
          user: { id: userId },
        },
      } = jwt.decode(authorization)
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      if (post.userId !== userId) {
        throw new HttpForbiddenError()
      }

      const patchedPost = await PostModel.query().patchAndFetchById(postId, {
        title,
        content,
      })

      send(patchedPost)
    },
  ],
})

export default handlers
