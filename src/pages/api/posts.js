import config from "@/api/config"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { pageValidator } from "@/utils/validators"

const handlers = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      models: { PostModel },
      input: {
        query: { page },
      },
    }) => {
      const {
        pagination: { limit },
      } = config
      const { results, total } = await PostModel.query()
        .page(page - 1, limit)
        .modifiers({
          restrictSelection(builder) {
            builder.select("id", "firstName", "lastName")
          },
        })
        .withGraphFetched("user(restrictSelection)")
        .orderBy("createdAt", "desc")

      send(results, {
        pages: Math.ceil(total / limit),
      })
    },
  ],
})

export default handlers
