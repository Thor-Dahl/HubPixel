export default function Navbar({ onOpenPostComposer, onProfileClick, onHomeClick, onLikedClick, onNotificationsClick, users, profileUserId }) {
  const profileUser = users.find((user) => user.id === profileUserId) || {
    name: "Guest",
    userHandle: "@guest-1932",
    profilePic: "images/default_pic.jpg"
  };
  return (
    <div className="nav-container">
      <div className="nav-personal">
        <button className="nav-button" onClick={onHomeClick}>
          <img src="icons/home.png" className="nav-icon" alt="Home" />
          <p className="nav-text"> Home</p>
        </button>
        <button className="nav-button" onClick={onNotificationsClick}>
            <img src="icons/bell.png" className="nav-icon" />
            <p className="nav-text"> Notifications</p>
        </button>
        <button className="nav-button">
            <img src="icons/email.png" className="nav-icon" />
            <p className="nav-text"> Messages</p>
        </button>
        <button className="nav-button" onClick={onProfileClick}>
            <img src="icons/user.png" className="nav-icon" />
            <p className="nav-text"> Profile</p>
        </button>
      </div>
      <div className="nav-saved">
        <button className="nav-button">
            <img src="icons/dashboard.png" className="nav-icon" />
            <p className="nav-text"> Inspoboards</p>
        </button>
        <button className="nav-button" onClick={onLikedClick}>
            <img src="icons/favourite.png" className="nav-icon" />
            <p className="nav-text"> Liked</p>
        </button>
            </div>
      <div className="nav-profile">
        <img src={profileUser.profilePic} id="nav-profile-pic" alt="User" />
        <div className="nav-profile-texts">
          <p id="nav-profile-name">{profileUser && profileUser.name}</p>
          <p id="nav-profile-username">{profileUser && profileUser.userHandle}</p>
        </div>
      </div>
      <button className="nav-post-button" onClick={onOpenPostComposer}>Post</button>
    </div>
  );
}