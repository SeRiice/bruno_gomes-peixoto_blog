import config from "@/api/config"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator, pageValidator } from "@/utils/validators"

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
})

export default handlers
