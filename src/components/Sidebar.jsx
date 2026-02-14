import { useEffect, useState} from "react";

export default function Sidebar({ isPostEditOpen, onCloseEdit, userName, bioText, onSaveProfile }) {
  const [draftName, setDraftName] = useState(userName);
  const [draftBio, setDraftBio] = useState(bioText);

  useEffect(() => {
    if (isPostEditOpen) {
      setDraftName(userName);
      setDraftBio(bioText);
    }
  }, [isPostEditOpen, userName, bioText]);

  const handleSubmit = (e) => {
      e.preventDefault();
      onSaveProfile(draftName, draftBio);
  };

  const handleCancel = () => {
    onCloseEdit();
  };

  let editPanelClass = "edit-profile-panel";
  if (isPostEditOpen) { editPanelClass = "edit-profile-panel show"}

  return (
    <div className="side-container">
        <div className={editPanelClass}>
        <div className="edit-profile-header">
          <h3>Edit Profile</h3>
          <button className="close-edit-btn" onClick={handleCancel}>×</button>
        </div>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={draftName} onChange={(e) => setDraftName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Handle</label>
            <input type="text" defaultValue="@userhandle" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea rows="4" value={draftBio} onChange={(e) => setDraftBio(e.target.value)}></textarea>
          </div>
          <button type="submit" className="save-profile-btn">Save Changes</button>
        </form>
      </div>
      
      <button className="inspoboard-container">
        <img src="images/castletower.png" className="inspoboard-icon" alt="Board" />
        <div className="inspoboard-info">
          <p id="inspoboard-name">Medieval Art</p>
          <p id="inspoboard-count">38 elements</p>
        </div>
      </button>
      <button className="inspoboard-container">
        <img src="images/house.png" className="inspoboard-icon" alt="Board" />
        <div className="inspoboard-info">
          <p id="inspoboard-name">Top Down</p>
          <p id="inspoboard-count">38 elements</p>
        </div>
      </button>
      <button className="inspoboard-container">
        <img src="images/farmhouse.png" className="inspoboard-icon" alt="Board" />
        <div className="inspoboard-info">
          <p id="inspoboard-name">Isometrics</p>
          <p id="inspoboard-count">38 elements</p>
        </div>
      </button>
    </div>
  );
}