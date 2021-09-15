import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import CreatePost from './CreatePost';
import CommentSection from './CommentSection';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { countTimeDiff } from '../../utils';

const PostDetail = () => {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [catId, setCatId] = useState([]);
    const [cate, setCate] = useState('');
    const { id } = useParams();
    const currentTitle = useRef(title);
    const currentContent = useRef(content);
    const currentFile = useRef(file);
    const endPoint = `http://localhost:9000/forums/posts/${id}`;
    const [postDetail, setpostDetail] = useState({});
    const currentUser = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .matches(
                /^[a-zA-Z0-9 ?.$'"-_()@!%*#?&\/\\]+$/,
                'Title cannot contain certain special characters'
            ),
        content: Yup.string()
            .required('Content is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        image: Yup.mixed()
            .test('fileSize', 'The file is too large', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return value[0].size <= 2000000;
            })
            .test('fileType', 'Only jpeg/png file is accepted', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return (
                    value[0].type === 'image/jpeg' ||
                    value[0].type === 'image/png'
                );
            }),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
=======
>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72

    useEffect(() => {
        fetchPostDetail();
        fetchPostComment();
        getCat();
    }, []);

    const fetchUserInfo = (passId, oldData, setFunction) => {
        fetch(`http://localhost:9000/profile/profiledetails/${passId}`)
            .then((res) => res.json())
            .then((dataProfile) =>
                setFunction({ ...oldData, username: dataProfile.username })
            );
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
    {
        /*Update Delete for Post*/
    }
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
<<<<<<< HEAD
        e.preventDefault();
=======
>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72
        const updatedPost = {
            title,
            content,
            image: file,
            post_category_id: cate,
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
                                    <h1 className='fw-bolder'>
                                        {postDetail.title}
                                    </h1>
                                    {isEditing ? (
                                            <textarea
                                                placeholder='Enter new title'
<<<<<<< HEAD
                                                class={`form-control border border-secondary ${
                                                    errors.title
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                                {...register('title')}
                                            ></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.title?.message}
                                            </div>{' '}
                                        </>
                                    ) : null}{' '}
=======
                                                class='form-control border border-secondary'
                                                   
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }                                            >

                                            </textarea>


                                    ) : (null

                                    )}{' '}
>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72
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
                                <figure class='img-fluid'>
                                    <img
                                        src={`/postUpload/${postDetail.image}`}
                                        class='d-block w-100 img-fluid'
                                        alt='...'
                                    />
                                    A caption for the above image.
                                </figure>

                                {isEditing ? (
                                    <input
                                        type='file'
                                        class='custom-file-input'
                                        id='inputGroupFile01'
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
                                ) : null}
                                <section
                                    className='mb-4 '
                                    style={{ textAlign: 'justify' }}
                                >
                                    <p className='lh-base mb-4 fs-5 lead'>
                                        {postDetail.content}
                                    </p>
                                    {isEditing ? (
                                            <textarea
                                                placeholder='Please enter content'
                                                onChange={(e) => {
                                                    setContent(e.target.value);
                                                }}
<<<<<<< HEAD
                                            ></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.content?.message}
                                            </div>{' '}
                                        </>
                                    ) : null}
=======
                                            >
                                            </textarea>

                                    ) : (null

                                    )}

>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72
                                </section>
                                <section>
                                    {isEditing ? (
                                            <select
<<<<<<< HEAD
                                                class={`custom-select  ${
                                                    errors.post_category_id
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
=======
                                                class='custom-select'  
>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72
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
                                                    <option value={cate._id}>
                                                        {cate.name}
                                                    </option>
                                                ))}
                                            </select>
<<<<<<< HEAD
                                            <div className='invalid-feedback'>
                                                {errors.category?.message}
                                            </div>{' '}
                                        </>
                                    ) : null}
=======

                                    ) : (null)
                                    }
>>>>>>> 45b3de62e7f2d0d44a2835b7bae8cfbad5feef72
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
                            {/* </form> */}
                        </article>
                        <CommentSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
