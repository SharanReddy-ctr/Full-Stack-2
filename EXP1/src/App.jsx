import React, { useState } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");

  const limits = {
    Twitter: 280,
    Facebook: 500,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const limit = limits[platform];
  const remaining = limit - post.length;

  return (
    <div className="container">
      <div className="card">
        <h1>Social Media Post Composer</h1>

        <label>Select Platform</label>

        <select
          value={platform}
          onChange={(e) => {
            setPlatform(e.target.value);
            setPost("");
          }}
        >
          <option>Twitter</option>
          <option>Facebook</option>
          <option>Instagram</option>
          <option>LinkedIn</option>
        </select>

        <textarea
          placeholder="Write your post..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>

        <div className="info">
          <span>
            Characters: {post.length}/{limit}
          </span>

          <span className={remaining < 0 ? "red" : "green"}>
            Remaining: {remaining}
          </span>
        </div>

        {remaining < 0 ? (
          <p className="red">Character limit exceeded.</p>
        ) : (
          <p className="green">Ready to publish.</p>
        )}

        <button disabled={remaining < 0 || post.length === 0}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default App;