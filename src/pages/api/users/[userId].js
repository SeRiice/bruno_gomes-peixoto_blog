import { HttpForbiddenError } from "@/api/errors/errors"
import adminPrivileges from "@/api/middlewares/adminPrivileges"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  disabledValidator,
  firstNameValidator,
  idValidator,
  lastNameValidator,
} from "@/utils/validators"
import jwt from "jsonwebtoken"

const handlers = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      models: { UserModel, PostModel, CommentModel },
      input: {
        query: { userId },
      },
    }) => {
      const user = await UserModel.query()
        .findById(userId)
        .modify("restrictSelection")
        .throwIfNotFound()
      const [{ count: postsCount }] = await PostModel.query()
        .where({ userId })
        .count()
      const [{ sum: totalVisits }] = await PostModel.query()
        .where({ userId })
        .sum("visits")
      const [{ count: commentsCount }] = await CommentModel.query()
        .where({ userId })
        .count()

      await send(user, {
        postsCount,
        commentsCount,
        totalVisits: totalVisits || 0,
      })
    },
  ],
  DELETE: [
    auth,
    adminPrivileges,
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      models: { UserModel, CommentModel, PostModel },
      input: {
        query: { userId },
      },
    }) => {
      const user = await UserModel.query()
        .findById(userId)
        .modify("restrictSelection")
        .withGraphFetched("role")
        .throwIfNotFound()
      const deletedComments = await CommentModel.query()
        .delete()
        .where({ userId: user.id })
      const deletedPosts = await PostModel.query()
        .delete()
        .where({ userId: user.id })

      await UserModel.query().deleteById(userId)

      send(user, { deletedComments, deletedPosts })
    },
  ],
  PATCH: [
    auth,
    validate({
      query: { userId: idValidator.required() },
      body: {
        firstName: firstNameValidator,
        lastName: lastNameValidator,
        roleId: idValidator,
        disabled: disabledValidator,
      },
    }),
    async ({
      send,
      req,
      models: { UserModel },
      input: {
        query: { userId },
        body: { firstName, lastName, roleId, disabled },
      },
    }) => {
      const query = UserModel.query().findById(userId)
      const user = await query.clone().throwIfNotFound()
      const { authorization } = req.headers
      const {
        payload: {
          user: { id },
          role: { name },
        },
      } = jwt.decode(authorization)
      const isAdmin = name === "ADMIN"

      if (user.id !== id && !isAdmin) {
        throw new HttpForbiddenError()
      }

      await query.clone().patch({
        firstName,
        lastName,
        roleId: isAdmin ? roleId : user.roleId,
        disabled: isAdmin ? disabled : user.disabled,
        updatedAt: new Date().toISOString(),
      })

      const patchedUser = await query.clone().modify("restrictSelection")

      send(patchedUser)
    },
  ],
})

export default handlers
