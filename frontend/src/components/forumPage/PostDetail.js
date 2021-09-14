import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import CreatePost from './CreatePost';
import CommentSection from './CommentSection';
import axios from 'axios';

import { countTimeDiff } from '../../utils';

const PostDetail = () => {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const endPoint = `http://localhost:9000/forums/posts/${id}`;
    const [postDetail, setpostDetail] = useState({});
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchPostDetail();
        fetchPostComment();
    }, []);

    const fetchUserInfo = (passId, oldData, setFunction) => {
        fetch(`http://localhost:9000/profile/profiledetails/${passId}`)
            .then((res) => res.json())
            .then((dataProfile) =>
                setFunction({ ...oldData, username: dataProfile.username })
            );
    };
    {
        /*Update Delete for Post*/
    }
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
            setIsEditing(true);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            title,
            content,
            image: file,
        };
        console.log(updatedPost);
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            updatedPost.image = fileName;
            console.log(updatedPost);
        }
        try {
            await axios.put(
                'http://localhost:9000/forums/posts/' + postDetail._id,
                updatedPost
            );
            window.location.replace(
                'http://localhost:3000/forum/post/postdetail/' + postDetail._id
            );
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
                });
            });
    };

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
                            <header class='my-4'>
                                {isEditing ? (
                                    <textarea
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    >
                                        {postDetail.title}
                                    </textarea>
                                ) : (
                                    <h1 className='fw-bolder'>
                                        {postDetail.title}
                                    </h1>
                                )}{' '}
                                <p class='text-muted fst-italic'>
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
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            ) : (
                                <figure class='img-fluid'>
                                    {/*<img src={`/postUpload/${postDetail.image}`} style ={{"opacity": "32%", "maxWidth": "1500px", "maxHeight": "300px"}}class="d-block w-100 img-fluid" alt="..." />*/}
                                    A caption for the above image.
                                </figure>
                            )}
                            <section
                                className='mb-4 '
                                style={{ textAlign: 'justify' }}
                            >
                                {isEditing ? (
                                    <textarea
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }}
                                    >
                                        {postDetail.content}
                                    </textarea>
                                ) : (
                                    <p className='lh-base mb-4 fs-5 lead'>
                                        {postDetail.content}
                                    </p>
                                )}
                            </section>

                            {currentUser.user_id === postDetail.user_id && (
                                <>
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
                                </>
                            )}
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
                        <CommentSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
