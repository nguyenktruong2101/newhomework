import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function CreatePost(props) {
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
        cat: Yup.string().test('value', 'Category is required', (value) => {
            if (value === '0') {
                return false;
            }
            return true;
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

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getCat();
    }, []);

    const getCat = async () => {
        try {
            const res = await axios.get(
                'http://localhost:9000/post_categories/'
            );
            const myCat = res?.data || {};
            setCat(myCat);
        } catch (err) {
            console.log(err);
        }
    };

    const submit = async (e) => {
        const newPost = {
            title,
            content,
            image: file,
            post_category_id: id, //id tưởng của user chứ. nếu sai thì sửa lại là e.category
            user_id: currentUser.user_id,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.image = fileName;
            try {
                await axios.post('http://localhost:9000/forums/upload', data);
            } catch (err) {}
        }

        try {
            await axios.post('http://localhost:9000/forums/posts', newPost);
            window.location.reload();
        } catch (err) {}

        //Recommend nên dùng formdata.append cho mấy cái properties còn lại luôn, rồi xong post cái formdata thôi
        // const data = new FormData();
        // data.append("title", e.title)
        // data.append("content", e.content)
        // data.append("image", e.image[0])
        // data.append("post_category_id", e.category)
        // data.append("user_id", ???) // Lấy từ props, pass data từ app.js

        // try {
        //     await axios.post('http://localhost:9000/forums/posts', data);
        //     window.location.reload();
        // } catch (err) {}
    };

    return (
        <div>
            <div className='pt-3'>
                <div className='card mb-4'>
                    <div
                        className='card-header text-center'
                        id='post-{{$post->id}}'
                    >
                        CREATE NEW POST
                    </div>

                    <div className='card-body container-fluid'>
                        <form
                            onSubmit={handleSubmit(submit)}
                            enctype='multipart/form-data'
                        >
                            <div className='row'>
                                <div className='form-group mb-3 col-7'>
                                    <label for='posttitle'>Title</label>
                                    <input
                                        type='text'
                                        className={`form-control border border-secondary ${
                                            errors.title ? 'is-invalid' : ''
                                        }`}
                                        placeholder='Post Title'
                                        id='posttitle'
                                        {...register('title')}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <div className='invalid-feedback'>
                                        {errors.title?.message}
                                    </div>
                                </div>
                                <div className='form-group mb-3 col-5'>
                                    <label for='inputGroupSelect01'>
                                        Category
                                    </label>
                                    <div>
                                        <select
                                            className={`custom-select  ${
                                                errors.cat ? 'is-invalid' : ''
                                            }`}
                                            id='inputGroupSelect01'
                                            style={{ height: '35px' }}
                                            {...register('cat')}
                                            onChange={(e) =>
                                                setId(e.target.value)
                                            }
                                        >
                                            <option selected>
                                                Choose Category
                                            </option>
                                            {cat.map((cate) => (
                                                <option value={cate._id}>
                                                    {cate.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='invalid-feedback'>
                                            {errors.cat?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group mb-3'>
                                <label for='postcontent'>Content</label>
                                <textarea
                                    className={`form-control border border-secondary ${
                                        errors.content ? 'is-invalid' : ''
                                    }`}
                                    placeholder='Post Content'
                                    id='postcontent'
                                    {...register('content')}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                ></textarea>
                                <div className='invalid-feedback'>
                                    {errors.content?.message}
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <div className='custom-file'>
                                    <label
                                        className='custom-file-label'
                                        for='inputGroupFile01'
                                    >
                                        Upload Image
                                    </label>
                                    <br />
                                    <input
                                        type='file'
                                        className={`custom-file-input ${
                                            errors.image ? 'is-invalid' : ''
                                        }`}
                                        id='inputGroupFile01'
                                        {...register('image')}
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
                                    <div className='invalid-feedback'>
                                        {errors.image?.message}
                                    </div>
                                </div>
                            </div>

                            <span className='pull-right'>
                                &nbsp;&nbsp;
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Upload
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
