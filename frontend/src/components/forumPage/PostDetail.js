import React, { useEffect, useState, useRef } from 'react';
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
    const [catId, setCatId] = useState([]);
    const [cate, setCate] = useState('');
    const [postDetail, setpostDetail] = useState({});

    const defaultValue = useRef();

    const { id } = useParams();
    const endPoint = `http://localhost:9000/forums/posts/${id}`;
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchPostDetail();
        getCat();
    }, []);

    const fetchUserInfo = (passId, oldData, setFunction) => {
        fetch(`http://localhost:9000/profile/profiledetails/${passId}`)
            .then((res) => res.json())
            .then((dataProfile) => {
                setFunction({ ...oldData, username: dataProfile.username });
                defaultValue.current = oldData;
            });
    };

    const getCat = async () => {
        try {
            const res = await axios.get(
                'http://localhost:9000/post_categories/'
            );
            const myCat = res?.data || {};
            setCatId(myCat);
        } catch (err) {}
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:9000/forums/posts/${id}`);
            window.location.replace('/');
        } catch (err) {}
    };

    const handleEdit = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleUpdate = async (e) => {
        const updatedPost = {
            title: title || defaultValue.current.title,
            content: content || defaultValue.current.content,
            image: file || defaultValue.current.image,
            post_category_id: cate || defaultValue.current.post_category_id,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            updatedPost.image = fileName;
        }
        try {
            await axios.put(
                'http://localhost:9000/forums/posts/' + postDetail._id,
                updatedPost
            );
            window.location.replace(
                'http://localhost:3000/forum/post/postdetail/' + postDetail._id
            );
        } catch (err) {}
    };

    const fetchPostDetail = () => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                fetchUserInfo(data.user_id, data, setpostDetail);
            });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-3 ps-5 pe-5'>
                    <Sidebar
                        showCreatePostForm={showCreatePostForm}
                        showForm={(showCreatePostForm) =>
                            setShowCreatePostForm(showCreatePostForm)
                        }
                    />
                </div>
                <div className='col-6'>
                    {showCreatePostForm && <CreatePost />}
                    <div className='row'>
                        <article>
                            <header className='my-4'>
                                {isEditing ? (
                                    <textarea
                                        placeholder='Enter new title'
                                        className='form-control border border-secondary'
                                        defaultValue={postDetail.title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></textarea>
                                ) : (
                                    <h1 className='fw-bolder'>
                                        {postDetail.title}
                                    </h1>
                                )}
                                <p className='text-muted fst-italic'>
                                    {`Last edited ${countTimeDiff(
                                        postDetail.updatedAt
                                    )} by ${postDetail.username}`}
                                </p>
                                <p className='fw-normal'>
                                    categories
                                    <button className='btn btn-light btn-sm'>
                                        urgent
                                    </button>
                                    <button className='btn btn-light btn-sm'>
                                        popular
                                    </button>
                                </p>
                            </header>
                            {postDetail.image && (
                                <figure className='img-fluid'>
                                    <img
                                        src={`/postUpload/${postDetail.image}`}
                                        className='d-block w-100 img-fluid'
                                        alt='...'
                                    />
                                    A caption for the above image.
                                </figure>
                            )}
                            {isEditing ? (
                                <input
                                    type='file'
                                    className='custom-file-input'
                                    id='inputGroupFile01'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            ) : null}
                            <section
                                className='mb-4 '
                                style={{ textAlign: 'justify' }}
                            >
                                {isEditing ? (
                                    <textarea
                                        placeholder='Please enter content'
                                        defaultValue={postDetail.content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }}
                                    ></textarea>
                                ) : (
                                    <p className='lh-base mb-4 fs-5 lead'>
                                        {postDetail.content}
                                    </p>
                                )}
                            </section>
                            <section>
                                {isEditing ? (
                                    <select
                                        className='custom-select'
                                        id='inputGroupSelect01'
                                        style={{ height: '35px' }}
                                        onChange={(e) =>
                                            setCate(e.target.value)
                                        }
                                    >
                                        <option selected>
                                            Choose Category
                                        </option>
                                        {catId.map((cate) => (
                                            <option
                                                key={cate._id}
                                                value={cate._id}
                                            >
                                                {cate.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : null}
                            </section>

                            {currentUser.id === postDetail.user_id && (
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
