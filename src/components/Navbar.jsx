export default function Navbar({ onOpenPostComposer, onProfileClick, onHomeClick, onLikedClick }) {
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
        <button className="nav-button" onClick={onLikedClick}>
            <img src="icons/favourite.png" className="nav-icon" />
            <p className="nav-text"> Liked</p>
        </button>
            </div>
      <div className="nav-profile">
        <img src="images/train.png" id="nav-profile-pic" alt="User" />
        <div className="nav-profile-texts">
          <p id="nav-profile-name">JurassicDino</p>
          <p id="nav-profile-username">@jurassicdino</p>
        </div>
      </div>
      <button className="nav-post-button" onClick={onOpenPostComposer}>Post</button>
    </div>
  );
}