const addNewVisit = async ({
  models: { PostModel },
  input: {
    query: { postId },
  },
}) => {
  await PostModel.query().findById(postId).increment("visits", 1)
}

export default addNewVisit
