import { useEffect, useState } from 'react';
export default function Sidebar(props) {
    const endPoint = 'http://localhost:9000/forums/post_category';
    const [postCategoryList, setpostCategoryList] = useState([]);
    const fetchPostCategories = () => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                setpostCategoryList(data);
            });
    };

    useEffect(() => {
        fetchPostCategories();
    }, []);

    //new
    return (
        <div
            className='d-flex flex-column flex-shrink-0 p-3 bg-light mt-3'
            style={{ width: '100%' }}
        >
            <a
                href='/'
                className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none'
            >
                <svg className='bi me-2' width='40' height='32'>
                    <use xlinkHref='#bootstrap' />
                </svg>
                <span className='text-center'>Categories</span>
            </a>
            <hr />
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='nav-item'>
                    <a
                        href='/forum'
                        className='nav-link link-dark'
                        aria-current='page'
                    >
                        <svg className='bi me-2' width='16' height='16'>
                            <use xlinkHref='#home' />
                        </svg>
                        General
                    </a>
                </li>
                <li>
                    <a href='/forum/popular' className='nav-link link-dark'>
                        <svg className='bi me-2' width='16' height='16'>
                            <use xlinkHref='#speedometer2' />
                        </svg>
                        Popular
                    </a>
                </li>
                {postCategoryList.map((element, index) => {
                    return (
                        <li key={index}>
                            <a
                                href={`/forum/categorized/${element._id}`}
                                className='nav-link link-dark'
                            >
                                <svg className='bi me-2' width='16' height='16'>
                                    <use xlinkHref='#table' />
                                </svg>
                                {element.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <hr />
            <button
                type='button'
                className='btn btn-dark'
                onClick={
                    props.showCreatePostForm
                        ? (e) => props.showForm(false)
                        : (e) => props.showForm(true)
                }
            >
                {props.showCreatePostForm ? 'Close Form' : 'Create New Post'}
            </button>
        </div>
    );
}
