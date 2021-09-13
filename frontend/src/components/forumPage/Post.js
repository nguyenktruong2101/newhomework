import { useEffect, useState } from "react";
import './Post.css'

export default function Post(props) {
    const new_like = "http://localhost:9000/vote/addvote"
    const dislike = "http://localhost:9000/vote/deletevote"
    const [liked, setLiked] = useState(false)
    const [numberOfVotes, setnumberOfVotes] = useState()
    const [user, setUser] = useState()
    const [followState, setFollowState] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if(props.isUser && props.element.vote.includes(currentUser.id)){
          setLiked(true)
        }
    }, [props.element.vote, props.isUser])

    console.log("PROPS.ELEMENT" + JSON.stringify(props.element))

    const follow = () => {
      fetch(`http://localhost:9000/user/${currentUser.id}/follow`, {
        method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({id: props.element.user_id})
      })
      .then(response => response.json())
      .then(data => setUser(data))
    }

    const unFollow = () => {
      fetch(`http://localhost:9000/user/${currentUser.id}/unfollow`, {
        method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({id: props.element.user_id})
      })
      .then(response => response.json())
      .then(data => {
        setUser(data)
      })
    }

    const create_like = (post_id) => {
      fetch(new_like, {
        method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ post_id: post_id, user_id: currentUser.id})
      })
      .then(response => response.json())
      .then(data => {
        console.log("VOTE DATA" + JSON.stringify(data))
        setnumberOfVotes(data)})
    }

    const dis_like = (post_id) => {
      fetch(dislike, {
        method: 'PUT',

         headers: {

           'Content-Type': 'application/json'

         },

         body: JSON.stringify({ post_id: post_id, user_id: currentUser.id})
      })
      .then(response => response.json())
      .then(data => {setnumberOfVotes(data)})
    }

    useEffect(() => {
      var followers = props.element.followers
      if (currentUser != null && followers && followers.includes(currentUser.id) ) {
        setFollowState(true)
      }
    }, [props.element.followers])

    return (
      <div class="card mb-4 mt-3">
        <div class="card-header text-muted" id={props.element._id}>
          <div>
          <a
            href={`/profile/${props.element.user_id}`}
            style={{ "text-decoration": "none", color: "black" }}
          >
            Posted by: {props.element.username ? props.element.username : props.username}&nbsp;&nbsp;
          </a>
          {props.createdAt}
          {props.isProfilePage ? "" : (props.isUser && currentUser.id !== props.element.user_id ?<button id="flw-btn" type="button" class="btn btn-primary float-right"
          style={currentUser != null && followState ? {background: "grey"} : {}} 
          onClick={currentUser != null && (followState ? () => {setFollowState(false); unFollow();} : () => {setFollowState(true); follow();})}>
              {followState ? "Unfollow" : "Follow"}
          </button> : "")}
          </div>
          <span class="pull-right">
            &nbsp;&nbsp;
            </span>
        </div>
        <a
          href={`/forum/post/postdetail/${props.element._id}`}
          style={{ "textDecoration": "none", color: "black" }}
        >
          <div class="card-body">
            <h3 class="card-title">
              {props.element.title} 
            </h3>
            <p class="class-text">{props.element.content}</p>
          </div>
          <div class="">
            <img
              class="card-img-bottom"
              src="http://simpleicon.com/wp-content/uploads/icon2.png"
              alt="post-image"
              style={{ width: "50%" }}
            />
          </div>
        </a>

        <div class="card-footer text-muted">
          <span>
            <span style={props.isUser && liked ? {color: "#0d6efd" } : {}} onClick= {props.isUser && (liked ? () => {setLiked(false); dis_like(props.element._id)} : () => {setLiked(true); create_like(props.element._id)})}>
              <i
                class="fa fa-thumbs-up hover-icon vote-button w3-large"
                id="post-{{$post->id}}-up"
                value="0"
              ></i>
            </span>
            <span class="numberOfLikes ms-2">
              {numberOfVotes ? numberOfVotes.vote.length : props.element.vote.length} Likes
            </span>
          </span>
          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <a
          href={`/forum/post/postdetail/${props.element._id}`}
          style={{ "textDecoration": "none", color: "black" }}>
            <i class=" fas fa-comment-dots hover-icon w3-large"></i>
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  ;
 
}

// return (

//         <div class="pt-3">
//             {Posts}
//             {Posts.map((element, index) => {
//         return <div class="card mb-4" key={index}>
//             <div class="card-header text-muted" id="post-{{$post->id}}">
//                 <a href="/profile" style={{ "text-decoration": "none", "color": "black"}}>Posted by:
//                 &nbsp;&nbsp;</a>

//                 <span class="pull-right">
//                     &nbsp;&nbsp;
//                     <button type="button" class="btn btn-primary">Follow</button>
//                     {/*<span class="dropdown">
//                         <i class="fas fa-edit pull-right hover-icon w3-xlarge" data-toggle="dropdown"></i>
//                         <div class="dropdown-menu" aria-labelledby="editMenu">
//                             <div class="dropdown-item" id="edit-post" data-toggle="modal" data-target="#edit-image-post-{{$post->id}}"> Edit post</div>
//                             <div class="dropdown-item" id="delete-post" data-toggle="modal" data-target="#deletePost{{$post->id}}"> Delete post</div>
//                         </div>
// </span>*/}
//                 </span>
//             </div>
//             {/*<Link to={`${props.url}/post/postdetail`} style={{ "text-decoration": "none", "color": "black" }}></Link>*/}
//             <a href={`${props.url === undefined ? "/forum" : props.url}/post/postdetail`} style={{ "text-decoration": "none", "color": "black"}}>
//                 <div class="card-body">
//                     <h3 class="card-title">{element.title} - Category {cateid}</h3>
//                     <p class="class-text">
//                     </p>
//                 </div>
//                 <div class="">
//                     <img class="card-img-bottom" src="http://simpleicon.com/wp-content/uploads/icon2.png" alt="post-image" style={{ "width": "50%" }} />
//                 </div>)
//             </a>

//             <div class="card-footer text-muted">
//                 <i class="fa fa-thumbs-up hover-icon vote-button w3-large" id="post-{{$post->id}}-up" value="0"></i>
//                 &nbsp;&nbsp;
//                 &nbsp;&nbsp;&nbsp;&nbsp;
//                 <a href={`${props.url == undefined ? "/forum" : props.url}/post/postdetail`} style={{ "text-decoration": "none", "color": "black"}}><i class=" fas fa-comment-dots hover-icon w3-large"></i></a>
//                 &nbsp;&nbsp;&nbsp;&nbsp;
//             </div>
//         </div>})}