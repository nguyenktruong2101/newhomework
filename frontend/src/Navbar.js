import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import weblogo from './weblogo.png';
export default function Navbar(props) {
    const endPoint = 'http://localhost:9000/news';

    const [newsCategoryList, setNewsCategoryList] = useState([]);

    useEffect(() => {
        fetchAllNewsCategory();
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        window.location.replace('http://localhost:3000');
    };

    const fetchAllNewsCategory = () => {
        fetch(endPoint + '/newscategory')
            .then((res) => res.json())
            .then((data) => {
                data.sort((first, second) => {
                    return first.name === 'Cases'
                        ? -1
                        : second.name === 'Cases'
                        ? 1
                        : 0;
                });
                setNewsCategoryList(data);
            });
    };

    return (
        <div>
            <nav
                className='navbar navbar-expand-lg navbar-dark'
                style={{ backgroundColor: '#A19882' }}
            >
                <div className='container-fluid'>
                    <a
                        className='navbar-brand'
                        href='/'
                        style={{ fontSize: '25px' }}
                    >
                        <img
                            src={weblogo}
                            alt=''
                            width='40'
                            height='40'
                            className='d-inline-block'
                        />
                        COVI-AWAY
                    </a>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <ul
                            className='navbar-nav me-auto mb-2 mb-lg-0'
                            style={{ fontSize: '20px' }}
                        >
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle'
                                    href='/'
                                    id='navbarDropdown'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    News
                                </a>
                                <ul
                                    className='dropdown-menu'
                                    aria-labelledby='navbarDropdown'
                                >
                                    {newsCategoryList.map((eachNew) => (
                                        <li key={eachNew._id}>
                                            <a
                                                className='dropdown-item'
                                                href={`/category/${eachNew._id}`}
                                            >
                                                {eachNew.name}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <hr className='dropdown-divider' />
                                    </li>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href={`/breaking`}
                                        >
                                            Breaking News
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='/forum'>
                                    Forum
                                </a>
                            </li>
                        </ul>
                        {props.isUser ? (
                            <div className='dropdown'>
                                <a
                                    href='#'
                                    className='d-flex align-items-center link-dark text-decoration-none dropdown-toggle'
                                    id='dropdownUser2'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                    role='button'
                                >
                                    <img
                                        src='https://github.com/mdo.png'
                                        alt=''
                                        width='32'
                                        height='32'
                                        className='rounded-circle me-2'
                                    />
                                    <strong>
                                        {props.currentUser.username}
                                    </strong>
                                </a>
                                <ul
                                    className='dropdown-menu dropdown-menu-end'
                                    aria-labelledby='dropdownUser2'
                                    data-popper-placement='top-end'
                                >
                                    {props.isReporter && (
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='/articleform'
                                            >
                                                Create New Article
                                            </a>
                                        </li>
                                    )}
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href={`/profile/${props.currentUser.id}`}
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <hr className='dropdown-divider' />
                                    </li>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='/'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                logout();
                                            }}
                                        >
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <a href='/signup'>
                                    <button
                                        className='btn btn-light me-2'
                                        type='button'
                                    >
                                        Sign Up
                                    </button>
                                </a>
                                <a href='/login'>
                                    <button
                                        className='btn btn-light'
                                        type='button'
                                    >
                                        Login
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
