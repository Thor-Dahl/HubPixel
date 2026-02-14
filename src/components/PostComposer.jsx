export default function PostComposer({
  isOpen,
  postTitle,
  postDescription,
  postImagePreview,
  onTitleChange,
  onDescriptionChange,
  onFileChange,
  onClearImage,
  onClose,
  onCreatePost,
}) {
  const overlayClass = isOpen ? "modal-overlay show" : "modal-overlay";
  const modalClass = isOpen ? "post-modal show" : "post-modal";
  const previewBorderStyle = postImagePreview ? { border: "none" } : { border: "2px dashed #d4ccc7" };

  const previewContent = postImagePreview ? (
    <>
      <button id="remove-img-btn" className="visible" onClick={onClearImage}>×</button>
      <img src={postImagePreview} id="image-preview" style={{ display: 'block', border: '1px solid #262425' }} alt="Preview"/>
    </>
  ) : (
    <div className="placeholder-content">
      <p id="file-status">No file chosen</p>
      <div className="file-upload-container">
        <input type="file" id="post-file-upload" onChange={onFileChange} style={{ display: 'none' }}/>
        <label htmlFor="post-file-upload" className="upload-button">Choose File</label>
      </div>
    </div>
  );

  return (
    <>
      <div className={overlayClass} onClick={onClose}></div>

      <div className={modalClass}>
        <div className="post-modal-header">
          <p>Upload a file</p>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="post-modal-content">
          <div className="post-forms-container">
            <form className="post-text-forms general-form">
              <input
                className="post-text-form"
                type="text"
                placeholder="Title your post"
                value={postTitle}
                onChange={onTitleChange}
              />
              <textarea
                className="post-text-form"
                id="post-text"
                placeholder="Describe your post"
                value={postDescription}
                onChange={onDescriptionChange}
              ></textarea>
            </form>

            <div className="image-preview-container" style={previewBorderStyle}>
              {previewContent}
            </div>
          </div>

          <button className="upload-button" id="post-proceed-button" onClick={onCreatePost}>Post</button>
        </div>
      </div>
    </>
  );
}
