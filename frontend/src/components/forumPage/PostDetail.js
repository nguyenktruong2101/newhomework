import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import CreatePost from './CreatePost';
import axios from 'axios';
export default function PostDetail() {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [updateData, setUpdateData] = useState({ title: '', content: '', image: '' });
    const [updateDataComment, setUpdateDataComment] = useState();
    const { id } = useParams();
    const endPoint = `http://localhost:9000/forums/posts/${id}`;
    const [postDetail, setpostDetail] = useState({});
    const [contentComment, setContentComment] = useState();
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const fetchUserInfo = (passId, oldData, setFunction) => {
        fetch(`http://localhost:9000/profile/profiledetails/${passId}`)
            .then((res) => res.json())
            .then((dataProfile) =>
                setFunction({ ...oldData, username: dataProfile.username })
            );
    };
    {/*Update Delete for Post*/ }
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:9000/forums/posts/${id}`);
            window.location.replace('/');
        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setUpdateData({ title: postDetail.title, content: postDetail.content, image: postDetail.image });
            setIsEditing(true);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(updateData);
        try {
            await axios.put(
                'http://localhost:9000/forums/posts/' + postDetail._id,
                updateData
            );
            window.location.replace("http://localhost:3000/forum/post/postdetail/" + postDetail._id);
        } catch (err) {
            console.log(err);
        }
    };

    {/*Update Delete for Comment*/ }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            content: contentComment,
            post_id: id,
        };

        try {
            await axios.post('http://localhost:9000/forums/comments', newComment);
            window.location.reload();
        } catch (err) { }
    };
    const handleDeleteComment = async () => {
        try {
            await axios.delete('http://localhost:9000/forums/comment/');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleEditComment = () => {
        if (isEditingComment) {
            setIsEditingComment(false);
        } else {
            setUpdateDataComment({ title: postDetail.title, content: postDetail.content });
            setIsEditingComment(true);
        }
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        console.log(updateDataComment);
        try {
            await axios.put(
                'http://localhost:9000/forums/comment/' + postCommentList._id,
                updateDataComment
            );
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };




    const fetchPostDetail = () => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchUserInfo(data.user_id, data, setpostDetail);
            });
        //   fetch(`http://localhost:9000/profile/profiledetails/${data.user_id}`)
        //     .then((res) => res.json())
        //     .then((dataProfile) => setpostDetail({...data, username: dataProfile.username }));})
    };
    const [postCommentList, setPostCommentList] = useState([]);
    const fetchPostComment = () => {
        fetch(`http://localhost:9000/forums/comment/${id}`)
            .then((response) => response.json())
            .then((data) => {
                data.map(async (commentElement) => {
                    let newElement = {};
                    await fetch(
                        `http://localhost:9000/profile/profiledetails/${commentElement.user_id}`
                    )
                        .then((res) => res.json())
                        .then(
                            (data) =>
                            (newElement = {
                                ...commentElement,
                                username: data.username,
                            })
                        )
                        .then((res) =>
                            setPostCommentList((postCommentList) => [
                                ...postCommentList,
                                res,
                            ])
                        );
                    //fetchPostUser(postElement.user_id)
                });
            });
        //setPosts(newData);
    };
    const countTimeDiff = (time) => {
        const diffTimeInMs = Date.now() - new Date(time);
        const years = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 365));
        if (years > 0) {
            return `${years > 1 ? `${years} years ago` : `${years} year ago`} `;
        }
        const months = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 30));
        if (months > 0) {
            return `${months > 1 ? `${months} months ago` : `${months} month ago`
                } `;
        }
        const days = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24));
        if (days > 0) {
            return `${days > 1 ? `${days} days ago` : `${days} day ago`} `;
        }
        const hours = Math.floor(diffTimeInMs / (1000 * 60 * 60));
        if (hours > 0) {
            return `${hours > 1 ? `${hours} hours ago` : `${hours} hour ago`} `;
        }
        const minutes = Math.floor(diffTimeInMs / (1000 * 60));
        if (minutes > 0) {
            return `${minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`
                } `;
        }
        const seconds = Math.floor(diffTimeInMs / 1000);
        if (seconds > 0) {
            return `${seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`
                } `;
        }
    };
    useEffect(() => {
        fetchPostDetail();
        fetchPostComment();
    }, []);
    return (
        <div class='container-fluid'>
            <div className='row'>
                <div class='col-3 ps-5 pe-5'>
                    <Sidebar
                        showCreatePostForm={showCreatePostForm}
                        showForm={(showCreatePostForm) =>
                            setShowCreatePostForm(showCreatePostForm)
                        }
                    />
                </div>

                <div class='col-6'>
                    {showCreatePostForm && <CreatePost />}
                    <div class='row'>
                        <article>
                            {console.log(postCommentList)}
                            <header class='my-4'>
                                {isEditing ? (
                                    <textarea
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                title: e.target.value,
                                            })
                                        }
                                    >
                                        {postDetail.title}
                                    </textarea>
                                ) : (
                                    <h1 className='fw-bolder'>{postDetail.title}</h1>
                                )}                                <p class='text-muted fst-italic'>
                                    Last edited{' '}
                                    {countTimeDiff(postDetail.updatedAt)} by{' '}
                                    {postDetail.username}
                                </p>
                                <p class='fw-normal'>
                                    categories
                                    <button class='btn btn-light btn-sm'>
                                        urgent
                                    </button>
                                    <button class='btn btn-light btn-sm'>
                                        popular
                                    </button>
                                </p>
                            </header>

                            {isEditing ? (
                                <input
                                    type='file'
                                    class='custom-file-input'
                                    id='inputGroupFile01'
                                    onChange={(e) =>
                                        setUpdateData(e.target.files[0])
                                    }
                                />) : (<figure class='img-fluid'>
                                    {/*<img src={`/postUpload/${postDetail.image}`} style ={{"opacity": "32%", "maxWidth": "1500px", "maxHeight": "300px"}}class="d-block w-100 img-fluid" alt="..." />*/}
                                    A caption for the above image.
                                </figure>

                            )
                            }
                            <section className='mb-4 ' style={{ textAlign: 'justify' }}>
                                {isEditing ? (
                                    <textarea
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                content: e.target.value,
                                            })
                                        }
                                    >
                                        {postDetail.content}
                                    </textarea>
                                ) : (
                                    <p className='lh-base mb-4 fs-5 lead'>
                                        {postDetail.content}
                                    </p>
                                )}
                            </section>

                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                            {isEditing && (
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            )}
                        </article>
                        <section>
                            <div class='mt-5'>
                                <div class='card bg-light'>
                                    <div class='card-body container'>
                                        <div class='row'>
                                            <form class='my-4 mx-2'
                                                onSubmit={handleSubmit}>
                                                <div className='form-floating'>
                                                    <textarea
                                                        className='form-control'
                                                        placeholder='Leave a comment here'
                                                        id='floatingTextarea2'
                                                        style={{ height: '100px' }}
                                                        onChange={(e) =>
                                                            setContentComment(e.target.value)
                                                        }
                                                    ></textarea>
                                                    <label for='floatingTextarea2'>
                                                        Comments
                                                    </label>
                                                </div>
                                                <button
                                                    type='submit'
                                                    className='btn btn-dark mt-3 pull-right'
                                                >
                                                    Post
                                                </button>
                                            </form>
                                        </div>
                                        {postCommentList.map((postComment) => {
                                            return (
                                                <div class='row'>
                                                    <div class='d-flex mb-4'>
                                                        <div class='flex-shrink-0'>
                                                            <img
                                                                class='rounded-circle'
                                                                src='https://dummyimage.com/50x50/ced4da/6c757d.jpg'
                                                                alt='...'
                                                            />
                                                        </div>
                                                        <div class='ms-3'>
                                                            <div class='fw-bold'>
                                                                {
                                                                    postComment.username
                                                                }
                                                            </div>
                                                            {isEditingComment ? (
                                                                <textarea
                                                                    onChange={(e) =>
                                                                        setUpdateData({
                                                                            ...updateData,
                                                                            content: e.target.value,
                                                                        })
                                                                    }
                                                                >
                                                                    {postComment.content}
                                                                </textarea>) : (


                                                                <div>
                                                                    {
                                                                        postComment.content
                                                                    }

                                                                </div>)}
                                                            <button
                                                                type='button'
                                                                className='btn btn-danger'
                                                                onClick={handleDeleteComment}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className='btn btn-secondary'
                                                                onClick={handleEditComment}
                                                            >
                                                                Edit
                                                            </button>
                                                            {isEditingComment && (
                                                            <button
                                                                type='button'
                                                                className='btn btn-secondary'
                                                                onClick={handleUpdateComment}
                                                            >
                                                                Update
                                                            </button>)}

                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class='col-3 mt-3'>
                    {/*<button type="button" class="btn btn-dark" style={{ marginLeft: "35%" }} onClick={() => setShowCreatePostForm(!showCreatePostForm)}>{showCreatePostForm ? "Close Form" : "Create New Post"}</button>   */}
                </div>
            </div >
        </div >
    );
}
