import Sidebar from "./Sidebar";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { useState, useEffect } from "react";

export default function ForumPage(props) {
  const [Posts, setPosts] = useState([]);
  const [sortedPostArray, setSortedPostArray] = useState([])
  //const [postUserInfo, setPostUserInfo] = useState({})
  // const fetchPostUser = (userId) => {
  //     var newElement = {}
  //     fetch(`http://localhost:9000/profile/${userId}`)
  //     .then(res => res.json())
  //     .then(data => setPostUserInfo({username: data.username}))
  // }
  const fetchPost =  () => {
    fetch("http://localhost:9000/forums/posts")
      .then((response) => response.json())
      .then((data) => {
        data.map(async function(postElement){
          await fetch(`http://localhost:9000/profile/profiledetails/${postElement.user_id}`)
            .then((res) => res.json())
            .then((data) => {setPosts(Posts => [...Posts, {...postElement, username: data.username, followers: data.followers }])})
            // .then(res => setPosts(Posts => [...Posts, res]));
          //fetchPostUser(postElement.user_id)
        });
        //setPosts(data);
      });
  };
  const sortPostArray = () => {
    var newPostArray = [...Posts];
    newPostArray.sort((first, second) => {
      return (new Date(second.createdAt) - new Date(first.createdAt))
    })
    setSortedPostArray(newPostArray)
  }
  
  const countTimeDiff = (time) => 
  {var diffTimeInMs = Date.now() - new Date(time)
    var years = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 365))
    if (years > 0) 
    {return `${years > 1 ? `${years} years ago` : `${years} year ago`} `}
    var months = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 30))
    if (months > 0) 
    {return `${months > 1 ? `${months} months ago` : `${months} month ago`} `}
    var days = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24))
    if (days > 0) 
    {return `${days > 1 ? `${days} days ago` : `${days} day ago`} `}
    var hours = Math.floor(diffTimeInMs / (1000 * 60 * 60))
    if (hours > 0) 
    {return `${hours > 1 ? `${hours} hours ago` : `${hours} hour ago`} `}
    var minutes = Math.floor(diffTimeInMs / (1000 * 60))
    if (minutes > 0) 
    {return `${minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`} `}
    var seconds = Math.floor(diffTimeInMs / 1000)
    if (seconds > 0) 
    {return `${seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`} `}}
  
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    sortPostArray();
  }, [Posts]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 ps-5 pe-5">
          <Sidebar
              setPostList = {e => setPosts(e)}
            showCreatePostForm={showCreatePostForm}
            showForm={(showCreatePostForm) =>
              setShowCreatePostForm(showCreatePostForm)
            }
          />
        </div>

        <div class="col-6">
          {showCreatePostForm && <CreatePost />}
            {sortedPostArray.map((element) => {
              return <Post isUser = {props.isUser} createdAt={countTimeDiff(element.createdAt)} element={element}/>;
            })} 
        </div>

        <div class="col-3 mt-3">
          {/*<button type="button" class="btn btn-dark" style={{ marginLeft: "35%" }} onClick={() => setShowCreatePostForm(!showCreatePostForm)}>{showCreatePostForm ? "Close Form" : "Create New Post"}</button>   */}
        </div>
      </div>
    </div>
  );
}
