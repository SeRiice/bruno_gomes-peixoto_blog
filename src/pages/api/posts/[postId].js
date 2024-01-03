import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"

const handlers = mw({
  GET: [
    validate({
      query: { postId: idValidator.required() },
    }),
    async ({
      send,
      models: { PostModel },
      input: {
        query: { postId },
      },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("user(restrictSelection)")
        .throwIfNotFound()

      send(post)
    },
  ],
})

export default handlers
