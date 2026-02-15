import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './Login';
import Sidebar from './components/Sidebar';
import Feed from './Feed';
import PostComposer from './components/PostComposer';
import './index.css';

function App() {
  // ==================================== DATABASE TEMPORARY ====================================

  const samplePosts = [
    { id: "post-1", 
      authorId: "user-1", 
      title: "Stone Tower Study #12", 
      description: "Tried building a compact isometric tower that feels abandoned but still cozy enough someone could be living there. Focused mostly on stone shading and creeping vines to break repetition in the walls. Still not fully happy with how the rock blends into the base terrain, but calling this version done before I spiral into endless micro-fixes again. Suggestions welcome if something looks off — always trying to improve structure readability in small resolutions. #pixelart #isometric #gamedevassets #environmentart", 
      imageSrc: "public/images/castletower.png", 
      createdAt: "Just now",
      likedBy: ["user-3", "user-2", "user-4", "user-7", "user-8", "user-9", "user-10", "user-10", "user-10"]
    },
    { id: "post-2", 
      authorId: "user-2", 
      title: "quiet place by the river", 
      description: "Just wanted something calm tonight. No big concept, just vibes. Small cabin, autumn trees, soft water animation coming later. Sometimes it’s nice making scenes where nothing dramatic is happening and the whole point is just atmosphere. Might expand this into a little explorable map eventually.", 
      imageSrc: "public/images/farmhouse.png", 
      createdAt: "Just now",
      likedBy: ["user-3", "user-2"]
    },
    { id: "post-3", 
      authorId: "user-7", 
      title: "Dev Note: Finish First, Polish Later", 
      description: "Posting this mainly for newer artists who get stuck refining tiny details before the piece even exists. The lighthouse scene started as a super rough island blob with a cylinder placeholder. Ugly, but functional. Once composition worked, I gradually refined shapes, then materials, then storytelling elements.", 
      imageSrc: "public/images/artmeme.png", 
      createdAt: "Just now",
      likedBy: ["user-3", "user-2"]
    },
    { id: "post-4", 
      authorId: "user-8", 
      title: "North Sea Territories Map Mockup", 
      description: "Experimental map piece inspired by medieval charts and territorial atlases. I wanted it to feel archival but still readable for gameplay or lore reference. Biggest challenge here was balancing decorative style with usability. Too realistic and labels get messy, too clean and it loses personality. I’m fairly happy with where it landed, though coastlines probably need another pass. Might try alternate political periods or fantasy versions later.", 
      imageSrc: "public/images/map.png", 
      createdAt: "Just now",
      likedBy: ["user-3", "user-2"]
    },
    { id: "post-7", 
      authorId: "user-9", 
      title: "cloud practice, nothing serious", 
      description: "Just color studies today. Testing moods more than shapes. Purple skies hit different honestly. Might reuse some palettes later.", 
      imageSrc: "public/images/cloudpractice.png", 
      createdAt: "Just now",
      likedBy: ["user-3", "user-2"]
    },
  ]

  const users = [
    {id: "user-1", name: "JurassicDino", profilePic: "images/train.png", userHandle: "@jurassicdino."},
    {id: "user-2", name: "ChieftainOfThePirates", profilePic: "images/chocmilk.png", userHandle: "@chieftainpirates"},
    {id: "user-3", name: "LiterallyPoopy", profilePic: "images/bust.png", userHandle: "@ltrlypoopy"},
    {id: "user-4", name: "Tsarist Siege", profilePic: "images/tsarist.png", userHandle: "@tsarist_seige"}, 
    {id: "user-7", name: "OnionSkin", profilePic: "images/onion.png", userHandle: "@oniononion-"},
    {id: "user-8", name: "FakeLoop", profilePic: "images/moon.png", userHandle: "@fakeloop27"},
    {id: "user-9", name: "Samkaka", profilePic: "images/chisaki.png", userHandle: "@samkaka_82"},
    {id: "user-10", name: "VampiraObscura", profilePic: "images/vampire.png", userHandle: "@vivi_obscura"},
  ]

  const sampleComments = [
    {id: "comment-1", userId: "user-2", postId: "post-1", content: "Yo amazing work! What software do you use? I use aesprite but the UI feels clunky for me"},
    {id: "comment-2", userId: "user-3", postId: "post-1", content: "I like the warm colour choices. The sword leaning on the brick wall seems really large though! I'm not sure even the mightiest knight can wield that lol"},
    {id: "comment-3", userId: "user-4", postId: "post-1", content: "Bruh I struggle with Isometric pixel art, how did you do this?"},
    {id: "comment-4", userId: "user-7", postId: "post-2", content: "test4"},
    {id: "comment-7", userId: "user-8", postId: "post-2", content: "test7"},
    {id: "comment-8", userId: "user-9", postId: "post-3", content: "test8"},
  ]

  // ==================================== STATES ====================================
  const [currentUserId, setCurrentUserId] = useState("user-1");
  //Nav View states
  const [activeView, setActiveView] = useState('home');
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState(false);
  //Compose Post states
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  //Edit profile
  const [userName, setUserName] = useState("");
  const [bioText, setBioText] = useState("");
  //Post information
  const [posts, setPosts] = useState(samplePosts);
  const userPosts = posts.filter((post) => post.authorId === currentUserId);

  const [comments, setComments] = useState(sampleComments);
  const [openPostId, setOpenPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  let activePosts = posts; 
  const likedPosts = activePosts.filter((post) => post.likedBy.includes(currentUserId));

  if (activeView === "profile") activePosts = userPosts;
  if (activeView === "liked") activePosts = likedPosts;
  //search query
  const filteredPosts = activePosts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  })
  // =================================== FUNCTIONS ==================================
  //VIEWS
  const showHome = () => {
    setActiveView('home');
    setIsProfileEditOpen(false);
  };
  const showProfile = () => { setActiveView('profile'); };
  const showLike = () => { setActiveView('liked'); };
  const showNotifications = () => setActiveView('notifications');
  const openProfileEdit = () => { setIsProfileEditOpen(true);};
  const closeProfileEdit = () => { setIsProfileEditOpen(false);};
  const openPostComposer = () => {setIsPostComposerOpen(true);};
  const closePostComposer = () => {setIsPostComposerOpen(false);};
  const clearImagePreview = () => {setPostImagePreview(null)};
  const handleOpenPost = (postId) => {setOpenPostId(postId)};
  
  const handleTitleChange = (e) => {setPostTitle(e.target.value);};
  const handleDescriptionChange = (e) => {setPostDescription(e.target.value);};

  const toggleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (postId !== post.id) {                 //check if this is the interacted post
        return post;
      }
      else {
        let updatedLikedBy = [];
        if (post.likedBy.includes(currentUserId)) {   //check if this interacted post is already liked or not
          updatedLikedBy = post.likedBy.filter((post) => post !== currentUserId); //unlike
        }
        else {
          updatedLikedBy = [...post.likedBy, currentUserId]; //like
        }
        return {...post, likedBy: updatedLikedBy};
      }
    })
    setPosts(updatedPosts);
  }

  const handleSaveProfile = (newName, newBio) => {
    setUserName(newName);
    setBioText(newBio);
    closeProfileEdit();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPostImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    const title = postTitle.trim();
    const description = postDescription.trim();
    if ((!title && !description) || !postImagePreview) { return; }

    if (editingPostId) {
      const updatedPosts = posts.map((post) => {
        if (post.id === editingPostId) {
          return {...post, title: title, description: description, imageSrc: postImagePreview};
        }
        else {
          return post;
        }
      }
      
      )
      setPosts(updatedPosts);
    } 
    else {
      const newPost = {
        id: crypto.randomUUID(),
        authorId: "user-1",
        title: title,
        description: description,
        imageSrc: postImagePreview,
        createdAt: Date.now(),
        likedBy: []
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
    setPostTitle("");
    setPostDescription("");
    setPostImagePreview(null);
    setEditingPostId(null);
    setIsPostComposerOpen(false);
  }

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (!postToEdit) { return; }

    setEditingPostId(postToEdit.id);
    setPostTitle(postToEdit.title);
    setPostDescription(postToEdit.description);
    setPostImagePreview(postToEdit.imageSrc);
    setIsPostComposerOpen(true);
  }

  const handleAddComment = (postId, commentContent) => {
    const newComment = {
      id: crypto.randomUUID(),
      userId: currentUserId,
      postId: postId,
      content: commentContent
    }
    setComments((prevComments) => [...prevComments, newComment]);
  }
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const handleLoginSubmit = (payload) => {
    console.log('Login payload:', payload);
    setIsLoginOpen(false);
  }
  // ==================================== COMMS =====================================
  return (
    <div className="body-container">

    <button className="button login-button" onClick={openLogin}>Login</button>

      <Navbar 
        onOpenPostComposer={openPostComposer} 
        onProfileClick={showProfile}
        onHomeClick={showHome}
        onLikedClick={showLike}
        onNotificationsClick={showNotifications}
      />

      {isLoginOpen && (
        <div className={`modal-overlay show`} onClick={closeLogin}>
          <div className="post-modal show" onClick={(e) => e.stopPropagation()}>
            <Login onSubmit={handleLoginSubmit} />
          </div>
        </div>
      )}

      <Feed 
        currentView={activeView}
        onEditClick={openProfileEdit}
        onDeletePost={handleDeletePost}
        onEditPost={handleEditPost}
        posts={filteredPosts}
        userName={userName}
        bioText={bioText}
        users={users}
        onLikePost={toggleLike}
        userId={currentUserId}
        onOpenPost={handleOpenPost}
        openPostId={openPostId}
        comments={comments}
        onAddComment={handleAddComment}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Sidebar 
        isPostEditOpen={isProfileEditOpen}
        onCloseEdit={closeProfileEdit}
        userName={userName}
        bioText={bioText}
        onSaveProfile={handleSaveProfile}
      />

      <PostComposer
        isOpen={isPostComposerOpen}
        postTitle={postTitle}
        postDescription={postDescription}
        postImagePreview={postImagePreview}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onFileChange={handleFileChange}
        onClearImage={clearImagePreview}
        onClose={closePostComposer}
        onCreatePost={handleSavePost}
      />

    </div>
  );
}

export default App;                   