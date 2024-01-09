import RequiresAuthorPrivileges from "@/components/privileges/RequiresAuthorPrivileges"
import CreatePostForm from "@/components/ui/form/post/CreatePostForm"

const CreatePost = () => (
  <RequiresAuthorPrivileges>
    <CreatePostForm />
  </RequiresAuthorPrivileges>
)

export default CreatePost
