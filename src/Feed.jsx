import React from 'react';
import { useState } from 'react';

function Feed({currentView, 
               onEditClick, 
               onDeletePost, 
               onEditPost, 
               posts, 
               userName, 
               bioText, 
               users, 
               onLikePost, 
               userId, 
               onOpenPost,
               openPostId,
               comments,
               onAddComment,
               searchQuery,
               onSearchChange
            }) 
{
  let profileHeader = null;
  const shouldShowPosts = currentView === "home" || currentView === "profile";
  const [newCommentText, setNewCommentText] = useState("");

  const handlePostComment = (postId) => {
    const trimmedComment = newCommentText.trim();

    if (!trimmedComment) return;

    onAddComment(postId, trimmedComment); 
    setNewCommentText("");
  }

  if (currentView === 'profile') {
    profileHeader = (
        <div className="profile-container">
        <div className="profile-header">
          <div className="profile-left">
            <img src="images/Festive-Bambi.png" className="profile-pic" alt="User" />
            <div className="profile-left-info">
              <div className="profile-handles">
                <p className="profile-name">{userName || "Username"}</p>
                <p className="profile-username">@userhandle</p>
              </div>
              <div className="profile-followers">
                <p><span className="profile-followers-count">150</span> Followers</p>
                <p><span className="profile-following-count">200</span> Following</p>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <p className="profile-bio">{bioText || "Your bio goes here. Share a bit about yourself!"}</p>
            <ul className="profile-bio">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
            <button className="edit-profile-btn" onClick={onEditClick}>Edit Profile</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <input className="main-search-bar" type="text" id="search-input" placeholder="Search. . ." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />


      {profileHeader}
      
      {shouldShowPosts ? (posts.map((post) => {
        const author = users.find((user) => user.id === post.authorId);
        const isLiked = post.likedBy.includes(userId);
        const openPost = openPostId === post.id;
        const postComments = comments.filter((comment) => post.id === comment.postId);
        
        return (
          <div className="main-post-container" key={post.id} onClick={() => onOpenPost(post.id)}>
            <div className="post-header">
              <img src={author.profilePic} className="post-profile-pic" alt="User" />
              <div className="post-user-info">
                <p className="post-name">{author.name}</p>
                <div className="post-subinfo">
                  <p className="post-username">{author.userHandle}</p>
                  <p className="post-dot">·</p>
                  <p className="post-time">just now</p>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropdown-button">Options</button>
                <div className="dropdown-content">
                  <button className="edit-text" onClick={(e) => {e.stopPropagation(); onEditPost(post.id);}}>Edit Post</button>
                  <button className="">Make Private</button>
                  <button className="delete-text" onClick={(e) => {e.stopPropagation(); onDeletePost(post.id);}}>Delete</button>
                </div>
              </div>
            </div>

            {post.imageSrc ? ( 
              <img src={post.imageSrc} className="post-img" alt={post.title} /> 
            ) : null}

            <div className="post-body">
              <div className="post-title">
                <p>{post.title}</p>
              </div>
              <p className="post-caption"> {post.description} </p>
            </div>
            <div className="post-interactions">
              <div className="small-interactions"> 
                <button className="interaction-button" onClick={(e) => {e.stopPropagation(); onLikePost(post.id);}}>
                  <img src={isLiked ? "icons/favourite-red.png" : "icons/favourite.png"} className="interaction-icon" alt="Favorite" />
                  <p>{post.likedBy.length || 0}</p>
                </button>
                <button className="interaction-button">
                  <img src="icons/chat-box.png" className="interaction-icon" alt="Comment" />
                  <p>0</p>
                </button>
                <button className="interaction-button">
                  <img src="icons/send.png" className="interaction-icon" alt="Share" />
                  <p>0</p>
                </button>
              </div> 
              <div className="dropdown dropdown-up">
                <button className="dropdown-button" id="save-button">Save</button>
                <div className="dropdown-content">
                  <a href="#">Isometrics</a>
                  <a href="#">Top Downs</a>
                  <a href="#">Interiors</a>
                </div>
              </div>
            </div>
            {/* COMMENT SECTION */}
            {openPost ? (
              <div className="comment-container">
                <div className="comment-composer">
                  <input className="comment-textbox" type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Write a comment..."></input>
                  <button class="button" onClick={() => handlePostComment(post.id)}>Post</button>
                </div>

                {postComments.map((comment) => {
                  const commentAuthor = users.find((user) => user.id === comment.userId);

                  return (
                    <div className="single-comment" key={comment.id}>
                      <div className="comment-user">
                        <img src={commentAuthor.profilePic}></img>
                        <div className="comment-user-name">
                          <p id="comment-username">{commentAuthor.name}</p>
                          <p id="comment-handle">{commentAuthor.userHandle}</p>
                        </div>
                      </div>
                      <div className="comment-body">
                        <div className="comment-body-content">
                          <p>{comment.content}</p>
                        </div>
                        <div className="comment-body-interactions">
                          <button className="interaction-button">
                            <img src={"icons/favourite.png"} className="interaction-icon" alt="Favorite" />
                          </button>
                          <button className="interaction-button">
                            <img src={"icons/star.png"} className="interaction-icon" alt="Favorite" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div> 
        )})
      ) : null
      }
    </div>
  );
}

export default Feed;