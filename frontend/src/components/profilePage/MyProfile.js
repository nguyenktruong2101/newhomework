import Post from "../forumPage/Post";

import ProfileCard from "./ProfileCard";
import './profile.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function MyProfile(props) {
const {id} = useParams()
console.log(id)
const endPoint = `http://localhost:9000/forums/userpost/${id}`
const [userPost, setuserPost] = useState([])
const fetchUserPost = () => {
    fetch(endPoint)
   .then(response => response.json())
   .then(data => {console.log(data); setuserPost(data)})
}

const [userProfile, setuserProfile] = useState()
const fetchUserProfile = () => {
    fetch(`http://localhost:9000/profile/profiledetails/${id}`)
   .then(response => response.json())
   .then(data => {console.log(data); setuserProfile(data)})
}
useEffect(()=>{
    fetchUserProfile();
    fetchUserPost()
},[])
const countTimeDiff = (time) => {
    var diffTimeInMs = Date.now() - new Date(time)
    var years = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 365))
    if (years > 0) {
        return `${years > 1 ? `${years} years ago` : `${years} year ago`} `
    }
    var months = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 30))
    if (months > 0) 
    {return `${months > 1 ? `${months} months ago` : `${months} month ago`} `}
    var days = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24))
    if (days > 0) {
        return `${days > 1 ? `${days} days ago` : `${days} day ago`} `
    }
    var hours = Math.floor(diffTimeInMs / (1000 * 60 * 60))
    if (hours > 0) {
        return `${hours > 1 ? `${hours} hours ago` : `${hours} hour ago`} `
    }
    var minutes = Math.floor(diffTimeInMs / (1000 * 60))
    if (minutes > 0) {
        return `${minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`} `
    }
    var seconds = Math.floor(diffTimeInMs / 1000)
    if (seconds > 0) {
        return `${seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`} `
    }
}
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8">
                    <ProfileCard user={userProfile !== undefined &&  userProfile} isUser = {props.isUser}/>
                    <div class="posts">
                        {userPost.map((element) => {
                            console.log(element)
                            return <Post isProfilePage = {true} username={userProfile !== undefined && userProfile.username} element={element} createdAt={countTimeDiff(element.createdAt)} isUser = {props.isUser}/>;
                        })}

                    </div>
                   
                    
                    
                </div>
                <div class="col-2 ms-auto me-auto">
                </div>
            </div>
        </div>
    )
}