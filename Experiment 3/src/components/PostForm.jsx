import { useState } from "react";
import "../styles/Post.css";

function PostForm({ addPost, showError }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      showError("Please enter both title and description.");
      return;
    }

    addPost({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="post-form">

      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button type="submit">
          Create Post
        </button>

      </form>

    </div>
  );
}

export default PostForm;