import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";

export default function PostDetail() {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const { id } = useParams()
    const endPoint = `http://localhost:9000/forums/posts/${id}`
    const [postDetail, setpostDetail] = useState({})
    const fetchUserInfo = (passId, oldData, setFunction) => {
        fetch(`http://localhost:9000/profile/profiledetails/${passId}`)
            .then((res) => res.json())
            .then((dataProfile) => setFunction({ ...oldData, username: dataProfile.username }));
    }

    const fetchPostDetail = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => { console.log(data); fetchUserInfo(data.user_id, data, setpostDetail) })
        //   fetch(`http://localhost:9000/profile/profiledetails/${data.user_id}`)
        //     .then((res) => res.json())
        //     .then((dataProfile) => setpostDetail({...data, username: dataProfile.username }));})
    }
    const [postCommentList, setPostCommentList] = useState([])
    const fetchPostComment = () => {
        fetch(`http://localhost:9000/forums/comment/${id}`)
            .then(response => response.json())
            .then((data) => {
                data.map(async (commentElement) => {
                    var newElement = {};
                    await fetch(`http://localhost:9000/profile/profiledetails/${commentElement.user_id}`)
                        .then((res) => res.json())
                        .then((data) => newElement = { ...commentElement, username: data.username })
                        .then(res => setPostCommentList(postCommentList => [...postCommentList, res]));
                    //fetchPostUser(postElement.user_id)
                })
            });
        //setPosts(newData);
    };
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
    useEffect(() => {
        fetchPostDetail();
        fetchPostComment();
    }, [])
    return (

        <div class="container-fluid">
            <div className="row">
                <div class="col-3 ps-5 pe-5">
                    <Sidebar
                        showCreatePostForm={showCreatePostForm}
                        showForm={(showCreatePostForm) =>
                            setShowCreatePostForm(showCreatePostForm)
                        }
                    />
                </div>

                <div class="col-6">
                    {showCreatePostForm && <CreatePost />}
                    <div class="row">
                        <article>
                            {console.log(postCommentList)}
                            <header class="my-4">
                                <h1 class="fw-bolder">
                                    {postDetail.title}
                                </h1>
                                <p class="text-muted fst-italic">Last edited {countTimeDiff(postDetail.updatedAt)} by {postDetail.username}</p>
                                <p class="fw-normal">categories<button class="btn btn-light btn-sm">urgent</button><button class="btn btn-light btn-sm">popular</button></p>
                            </header>
                            <figure class="img-fluid">
                                <img src="https://img.buzzfeed.com/buzzfeed-static/static/2016-01/22/17/campaign_images/webdr14/19-hermosos-regalos-para-gente-obsesionada-con-fr-2-25600-1453503418-3_dblbig.jpg" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure." />
                                <figcaption class="figure-caption">A caption for the above image.</figcaption>
                            </figure>
                            <section class="mb-4 " style={{ textAlign: "justify" }}>
                                <p class="lh-base mb-4 fs-5 lead">{postDetail.content}</p>
                            </section>
                        </article>
                        <section>
                            <div class="mt-5">
                                <div class="card bg-light">
                                    <div class="card-body container">
                                        <div class="row">
                                            <form class="my-4 mx-2">
                                                <div class="form-floating">
                                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ "height": "100px" }}></textarea>
                                                    <label for="floatingTextarea2">Comments</label>
                                                </div>
                                                <button class="btn btn-dark mt-3 pull-right">Post</button>
                                            </form>
                                        </div>
                                        {postCommentList.map(
                                            (postComment) => {
                                                return (
                                                    <div class="row">
                                                        <div class="d-flex mb-4">
                                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." />
                                                            </div>
                                                            <div class="ms-3">
                                                                <div class="fw-bold">{postComment.username}</div>
                                                                <div>{postComment.content}</div>
                                                            </div>
                                                        </div>
                                                    </div>)
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="col-3 mt-3">
                    {/*<button type="button" class="btn btn-dark" style={{ marginLeft: "35%" }} onClick={() => setShowCreatePostForm(!showCreatePostForm)}>{showCreatePostForm ? "Close Form" : "Create New Post"}</button>   */}
                </div>
            </div>
        </div >
    )
}

