export default function Navbar({ onOpenPostComposer, onProfileClick, onHomeClick }) {
  return (
    <div className="nav-container">
      <div className="nav-personal">
        <button className="nav-button" onClick={onHomeClick}>
          <img src="icons/home.png" className="nav-icon" alt="Home" />
          <p className="nav-text"> Home</p>
        </button>
        <button className="nav-button">
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
        <button className="nav-button">
            <img src="icons/favourite.png" className="nav-icon" />
            <p className="nav-text"> Favorites</p>
        </button>
        <button className="nav-button">
            <img src="icons/star.png" className="nav-icon" />
            <p className="nav-text"> Liked</p>
        </button>
            </div>
      <div className="nav-profile">
        <img src="images/Festive-Bambi.png" id="nav-profile-pic" alt="User" />
        <div className="nav-profile-texts">
          <p id="nav-profile-name">Username</p>
          <p id="nav-profile-username">@userhandle</p>
        </div>
      </div>
      <button className="nav-post-button" onClick={onOpenPostComposer}>Post</button>
    </div>
  );
}