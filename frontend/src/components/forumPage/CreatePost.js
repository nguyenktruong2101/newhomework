import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';

const CreatePost = () => {
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
            post_category_id: id,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.img = fileName;
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
                        <form onSubmit={handleSubmit}>
                            <div class='row'>
                                <div class='form-group mb-3 col-7'>
                                    <label for='posttitle'>Title</label>
                                    <input
                                        type='text'
                                        class='form-control border border-secondary'
                                        placeholder='Post Title'
                                        id='posttitle'
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div class='form-group mb-3 col-5'>
                                    <label for='inputGroupSelect01'>
                                        Category
                                    </label>
                                    <div>
                                        <select
                                            class='custom-select'
                                            id='inputGroupSelect01'
                                            style={{ height: '35px' }}
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
                                    </div>
                                </div>
                            </div>
                            <div class='form-group mb-3'>
                                <label for='postcontent'>Content</label>
                                <textarea
                                    class='form-control border border-secondary'
                                    placeholder='Post Content'
                                    id='postcontent'
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                ></textarea>
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
                                        class='custom-file-input'
                                        id='inputGroupFile01'
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
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

export default memo(CreatePost);
