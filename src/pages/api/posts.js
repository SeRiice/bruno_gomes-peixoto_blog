import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import authorPrivileges from "@/api/middlewares/authorPrivileges"

import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  contentValidator,
  idValidator,
  pageValidator,
  titleValidator,
} from "@/utils/validators"
import jwt from "jsonwebtoken"

const handlers = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
        userId: idValidator,
      },
    }),
    async ({
      send,
      models: { PostModel },
      input: {
        query: { page, userId },
      },
    }) => {
      const {
        pagination: { limit },
      } = config
      const { results, total } = await PostModel.query()
        .page(page - 1, limit)
        .where(userId ? { userId } : true)
        .withGraphFetched("user(restrictSelection)")
        .orderBy("createdAt", "desc")
      const maxPages = Math.ceil(total / limit)
      const nextPage = page + 1 > maxPages ? null : page + 1
      const previousPage = page - 1 < 1 ? null : page - 1

      send(results, {
        maxPages,
        nextPage,
        previousPage,
        page,
      })
    },
  ],
  POST: [
    auth,
    authorPrivileges,
    validate({
      body: {
        title: titleValidator.required(),
        content: contentValidator.required(),
      },
    }),
    async ({
      send,
      req,
      models: { PostModel },
      input: {
        body: { title, content },
      },
    }) => {
      const { authorization } = req.headers
      const {
        payload: {
          user: { id: userId },
        },
      } = jwt.decode(authorization)
      const post = await PostModel.query().insertAndFetch({
        title,
        content,
        userId,
      })

      send(post)
    },
  ],
})

export default handlers
