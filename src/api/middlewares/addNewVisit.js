const addNewVisit = async ({
  models: { PostModel },
  input: {
    query: { postId, edit },
  },
}) => {
  if (edit) {
    return
  }

  await PostModel.query().findById(postId).increment("visits", 1)
}

export default addNewVisit
