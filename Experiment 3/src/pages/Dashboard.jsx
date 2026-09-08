import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import postsData from "../data/posts";

import "../styles/Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState(postsData);
  const [message, setMessage] = useState("");

  const showError = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // CREATE
  const addPost = (newPost) => {
    if (user.role !== "Admin") {
      showError("Access Denied: Only Admin can create posts.");
      return;
    }

    setPosts((currentPosts) => [
      ...currentPosts,
      newPost,
    ]);
  };

  // EDIT
  const editPost = (id) => {
    if (
      user.role !== "Admin" &&
      user.role !== "Editor"
    ) {
      showError("Access Denied: Viewer cannot edit posts.");
      return;
    }

    const post = posts.find(
      (item) => item.id === id
    );

    if (!post) return;

    const newTitle = prompt(
      "Enter new title:",
      post.title
    );

    if (!newTitle || !newTitle.trim()) {
      return;
    }

    const newDescription = prompt(
      "Enter new description:",
      post.description
    );

    if (!newDescription || !newDescription.trim()) {
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((item) =>
        item.id === id
          ? {
              ...item,
              title: newTitle,
              description: newDescription,
            }
          : item
      )
    );
  };

  // DELETE
  const deletePost = (id) => {
    if (user.role !== "Admin") {
      showError("Access Denied: Only Admin can delete posts.");
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== id
      )
    );
  };

  // VIEW
  const viewPost = (post) => {
    alert(
      `Title: ${post.title}\n\n${post.description}`
    );
  };

  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard">

        <h1>Posts</h1>

        {message && (
          <div className="action-message">
            {message}
          </div>
        )}

        {/* Create form is always available.
            RBAC decides whether it can actually work. */}
        <PostForm
          addPost={addPost}
          showError={showError}
        />

        <div className="posts-grid">

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              role={user.role}
              editPost={editPost}
              deletePost={deletePost}
              viewPost={viewPost}
              showError={showError}
            />
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Dashboard;