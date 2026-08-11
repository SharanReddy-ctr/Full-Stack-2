import React from 'react';

const EditorPage = () => (
  <div className="page-card">
    <h2>Editor Panel</h2>
    <p>Editors can create and update content but do not have administrative privileges.</p>
    <button type="button">Create Article</button>
    <button type="button">Edit Existing Article</button>
  </div>
);

export default EditorPage;
