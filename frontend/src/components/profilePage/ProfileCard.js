import { useState, useEffect } from 'react';
import './ProfileCard.css';
import UpdateProfile from './UpdateProfile';

export default function ProfileCard(props) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState();
    const [userFollowing, setuserFollowing] = useState();
    const [followState, setFollowState] = useState(false);

    const fetchFollowing = () => {
        fetch(`http://localhost:9000/profile/allusers`)
            .then((response) => response.json())
            .then((data) => {
                var following = data.filter((element) => {
                    if (element.followers.includes(props.user._id)) {
                        return element;
                    }
                });
                setuserFollowing(following);
            });
    };

    const follow = () => {
        fetch(`http://localhost:9000/user/${currentUser.id}/follow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: props.user._id }),
        })
            .then((response) => response.json())
            .then((data) => setUser(data));
    };

    const unFollow = () => {
        fetch(`http://localhost:9000/user/${currentUser.id}/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: props.user._id }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
    };

    useEffect(() => {
        fetchFollowing();
        // check if current user have followed
        if (
            currentUser != null &&
            props.user.followers &&
            props.user.followers.includes(currentUser.id)
        ) {
            setFollowState(true);
        }
    }, [props.user._id, props.user.followers]);

    return (
        <div className='wrapper'>
            <div className='left'>
                <img
                    src='https://wallpaperaccess.com/full/2213424.jpg'
                    alt='user'
                    width='100'
                />
                <h4>
                    {props.user.name ? props.user.name : 'Your name is here'}
                </h4>
                <p>{props.user.username}</p>
            </div>
            <div className='right'>
                <div className='info'>
                    <h3>Information</h3>
                    <div className='info_data'>
                        <div className='data'>
                            <h4>Email</h4>
                            <p>{props.user.email}</p>
                        </div>
                        <div className='data'>
                            <h4>Phone</h4>
                            <p>
                                {props.user.phoneNumber
                                    ? props.user.phoneNumber
                                    : 'Your phone goes here'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flw_status'>
                    <h3>Projects</h3>
                    <div className='flw_status_data'>
                        <div className='data'>
                            <h4>Followers</h4>
                            <p>
                                {user
                                    ? user.followers.length
                                    : props.user.followers
                                    ? props.user.followers.length
                                    : '0'}
                            </p>
                        </div>
                        <div className='data'>
                            <h4>Following</h4>
                            <p>{userFollowing ? userFollowing.length : '0'}</p>
                        </div>
                    </div>
                </div>

                <div className='social_media'>
                    <ul>
                        <li>
                            <a href='#'>
                                <i className='fab fa-facebook-f'></i>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <i className='fab fa-twitter'></i>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <i className='fab fa-instagram'></i>
                            </a>
                        </li>
                        {props.isUser && currentUser.id === props.user._id ? (
                            <UpdateProfile
                                user={props.user !== undefined && props.user}
                            />
                        ) : props.isUser ? (
                            <button
                                id='follow-btn'
                                type='button'
                                className='btn btn-primary float-right'
                                style={
                                    currentUser != null && followState
                                        ? { background: 'grey' }
                                        : {}
                                }
                                onClick={
                                    currentUser != null &&
                                    (followState
                                        ? () => {
                                              setFollowState(false);
                                              unFollow();
                                          }
                                        : () => {
                                              setFollowState(true);
                                              follow();
                                          })
                                }
                            >
                                {followState ? 'Unfollow' : 'Follow'}
                            </button>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
