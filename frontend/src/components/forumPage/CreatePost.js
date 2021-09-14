import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function CreatePost(props) {


const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .matches(/^[a-zA-Z0-9 ?.$'"-_()@!%*#?&\/\\]+$/, 'Title cannot contain certain special characters'),
    content: Yup.string()
        .required('Content is required')
        .matches(/^[a-zA-Z0-9 ?,.$'"-:+_()@!%*#?&\/\\(\r\n|\r|\n)]+$/, 'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'),
    image: Yup.mixed()
        .test("fileName", "Image is required", (value) => {
            if (value.length) {
                return true // attachment is optional
            }
            return false
        })
        
        .test("fileSize", "The file is too large", (value) => {
            if (!value.length) {
                return true // attachment is optional
            }
            return value[0].size <= 2000000
        })
        .test("fileType", "Only jpeg/png file is accepted", (value) => {
            if (!value.length) {
                return true // attachment is optional
            }
            return value[0].type === "image/jpeg" || value[0].type === "image/png"
        }),
    category: Yup.string()
        .test("value", "Category is required", (value) => {
            if (value === "0") {
                return false
            }
            return true
        })
    });
    const { register, submit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });



    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);

    useEffect(() => {
        getCat();
    }, []);

    const getCat = async () => {
        try {
            const res = await axios.get(
                'http://localhost:9000/post_categories/'
            );
            console.log('ressssss', res);
            const myCat = res?.data || {};
            setCat(myCat);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            title,
            content,
            image: file,
            post_category_id: id,
        
        }; 

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.image = fileName;
            console.log(newPost);
            try {
                await axios.post('http://localhost:9000/forums/upload', data);
            } catch (err) {}
        }

        try {
            await axios.post('http://localhost:9000/forums/posts', newPost);
            window.location.reload();
        } catch (err) {}
    };

    return (
        <div>
            <div class='pt-3'>
                <div class='card mb-4'>
                    <div
                        class='card-header text-center'
                        id='post-{{$post->id}}'
                    >
                     CREATE NEW POST
                    </div>

                    <div class='card-body container-fluid'>
                        <form onSubmit={submit(handleSubmit)} enctype="multipart/form-data">
                            <div class='row'>
                                <div class='form-group mb-3 col-7'>
                                    <label for='posttitle'>Title</label>
                                    <input
                                        type='text'
                                        class={`form-control border border-secondary ${errors.title ? 'is-invalid' : ''}`}                                        placeholder='Post Title'
                                        id='posttitle'
                                        {...register('title')}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <div 
                                    className="invalid-feedback">
                                        {errors.title?.message}
                                        </div>

                                </div>
                                <div class='form-group mb-3 col-5'>
                                    <label for='inputGroupSelect01'>
                                        Category
                                    </label>
                                    <div>
                                        <select
                                            class={`custom-select  ${errors.category ? 'is-invalid' : ''}`}
                                            id='inputGroupSelect01'
                                            style={{ height: '35px' }}
                                            {...register('category')}
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
                                        <div 
                                        className="invalid-feedback">
                                            {errors.category?.message}
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class='form-group mb-3'>
                                <label for='postcontent'>Content</label>
                                <textarea
                                    class={`form-control border border-secondary ${errors.content ? 'is-invalid' : ''}`}
                                    placeholder='Post Content'
                                    id='postcontent'
                                    {...register('content')}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                ></textarea>
                                <div 
                                className="invalid-feedback">
                                    {errors.content?.message}
                                    </div>
                            </div>

                            <div class='form-group mb-3'>
                                <div class='custom-file'>
                                    <label
                                        class='custom-file-label'
                                        for='inputGroupFile01'
                                    >
                                        Upload Image
                                    </label>
                                    <br />
                                    <input
                                        type='file'
                                        class={`custom-file-input ${errors.image ? 'is-invalid' : ''}`}
                                        id='inputGroupFile01'
                                        {...register('image')}
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
                                    <div 
                                    className="invalid-feedback">
                                        {errors.image?.message}
                                        </div>
                                </div>
                            </div>

                            <span class='pull-right'>
                                &nbsp;&nbsp;
                                <button type='submit' class='btn btn-primary'>
                                    Upload
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

