import "../styles/Post.css";

function PostCard({
  post,
  role,
  editPost,
  deletePost,
  viewPost,
  showError,
}) {

  const handleEdit = () => {
    if (role === "Viewer") {
      showError(
        "Access Denied: Viewer cannot edit posts."
      );
      return;
    }

    editPost(post.id);
  };

  const handleDelete = () => {
    if (role !== "Admin") {
      showError(
        "Access Denied: Only Admin can delete posts."
      );
      return;
    }

    deletePost(post.id);
  };

  const handleView = () => {
    viewPost(post);
  };

  return (
    <div className="post-card">

      <h3>{post.title}</h3>

      <p>{post.description}</p>

      <div className="post-actions">

        <button
          className="view-btn"
          onClick={handleView}
        >
          View
        </button>

        <button
          className="edit-btn"
          onClick={handleEdit}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default PostCard;