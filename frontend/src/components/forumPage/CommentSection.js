import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import lodash from 'lodash';
import { useParams } from 'react-router';

const CommentSection = ({}) => {
    const { id } = useParams();

    const [fetchComment, setFetchComment] = useState([]);
    const [contentComment, setContentComment] = useState();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getComment();
    }, []);

    const getComment = () => {
        axios
            .get(`http://localhost:9000/forums/comment/${id}`)
            .then((response) => {
                if (Array.isArray(response?.data)) {
                    const temp = response.data.filter((item) =>
                        item.hasOwnProperty('user_id')
                    );
                    const modified = [];
                    for (let i = 0; i < temp.length; ++i) {
                        const userId = temp[i].user_id;
                        axios
                            .get(
                                `http://localhost:9000/profile/profiledetails/${userId}`
                            )
                            .then((result) => {
                                if (result?.data) {
                                    const { username, name } = result.data;
                                    modified.push({
                                        ...temp[i],
                                        username,
                                        name,
                                    });
                                }
                            })
                            .catch((error) => console.error(error));
                    }
                    setFetchComment(modified);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/forums/comments', {
                content: contentComment,
                user_id: currentUser.id,
                post_id: id,
            })
            .catch((err) => {});
        window.location.reload();
    };

    const handleChangeComment = (e) => {
        const debounce = lodash.debounce(
            (value) => setContentComment(value),
            300
        );
        debounce(e.target.value);
    };

    useEffect(() => {
        console.log(contentComment);
    }, [contentComment]);

    return (
        <section>
            <div className='mt-5'>
                <div className='card bg-light'>
                    <div className='card-body container'>
                        <div className='row'>
                            <form className='my-4 mx-2' onSubmit={handleSubmit}>
                                <div className='form-floating'>
                                    <textarea
                                        className='form-control'
                                        placeholder='Leave a comment here'
                                        id='floatingTextarea2'
                                        style={{
                                            height: '100px',
                                        }}
                                        onChange={handleChangeComment}
                                    />
                                    <label htmlFor='floatingTextarea2'>
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
                        {fetchComment.length > 0 &&
                            fetchComment.map((item) => (
                                <CommentObject data={item} />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CommentObject = ({ data }) => {
    const { username, content, _id, user_id } = data || {};
    const [isEditing, setIsEditing] = useState(false);
    const [updateDataComment, setUpdateDataComment] = useState();
    const currentComment = useRef(content);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const handleDeleteComment = () => {
        axios
            .delete(`http://localhost:9000/forums/comment/${_id}`)
            .catch((error) => console.error(error))
            .finally(() => window.location.reload());
    };

    const handleEditComment = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleUpdateComment = (e) => {
        if (updateDataComment === currentComment.current) {
            setIsEditing(false);
        } else {
            e.preventDefault();
            axios
                .put(`http://localhost:9000/forums/comment/${_id}`, {
                    content: updateDataComment,
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    setIsEditing(false);
                    window.location.reload();
                });
        }
    };

    // const renderButton = () => {
    //     if (user_id === currentUser.id) {
    //         return
    //     }
    // }

    return (
        <div className='row' key={_id}>
            <div className='d-flex mb-4'>
                <div className='flex-shrink-0'>
                    <img
                        className='rounded-circle'
                        src='https://dummyimage.com/50x50/ced4da/6c757d.jpg'
                        alt='...'
                    />
                </div>
                <div className='ms-3'>
                    <div className='fw-bold'>{username}</div>
                    {isEditing ? (
                        <textarea
                            onChange={(e) =>
                                setUpdateDataComment(e.target.value)
                            }
                        >
                            {content}
                        </textarea>
                    ) : (
                        <div>{content}</div>
                    )}
                    {user_id === currentUser.id && (
                        <>
                            <div
                                className='btn btn-danger'
                                onClick={handleDeleteComment}
                            >
                                Delete
                            </div>
                            <div
                                className='btn btn-secondary'
                                onClick={handleEditComment}
                            >
                                Edit
                            </div>
                        </>
                    )}
                    {isEditing && (
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={handleUpdateComment}
                        >
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
