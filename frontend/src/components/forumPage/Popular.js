import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Post from './Post';
import CreatePost from './CreatePost';
import { countTimeDiff } from '../../utils';

export default function Popular(props) {
    const [Posts, setPosts] = useState([]);
    const [sortedPostArray, setSortedPostArray] = useState([]);
    //const [postUserInfo, setPostUserInfo] = useState({})
    // const fetchPostUser = (userId) => {
    //     var newElement = {}
    //     fetch(`http://localhost:9000/profile/${userId}`)
    //     .then(res => res.json())
    //     .then(data => setPostUserInfo({username: data.username}))
    // }
    const fetchPost = () => {
        fetch('http://localhost:9000/forums/posts')
            .then((response) => response.json())
            .then((data) => {
                data.map(async function (postElement) {
                    await fetch(
                        `http://localhost:9000/profile/profiledetails/${postElement.user_id}`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            setPosts((Posts) => [
                                ...Posts,
                                {
                                    ...postElement,
                                    username: data.username,
                                    followers: data.followers,
                                },
                            ]);
                        });
                    // .then(res => setPosts(Posts => [...Posts, res]));
                    //fetchPostUser(postElement.user_id)
                });
                //setPosts(data);
            });
    };
    const sortPostArray = () => {
        var newPostArray = [...Posts];
        newPostArray.sort((first, second) => {
            return second.vote.length - first.vote.length;
        });
        setSortedPostArray(newPostArray);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    useEffect(() => {
        sortPostArray();
    }, [Posts]);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-3 ps-5 pe-5'>
                    <Sidebar
                        setPostList={(e) => setPosts(e)}
                        showCreatePostForm={showCreatePostForm}
                        showForm={(showCreatePostForm) =>
                            setShowCreatePostForm(showCreatePostForm)
                        }
                    />
                </div>

                <div className='col-6'>
                    {showCreatePostForm && <CreatePost />}
                    {sortedPostArray.map((element) => {
                        return (
                            <Post
                                isUser={props.isUser}
                                createdAt={countTimeDiff(element.createdAt)}
                                element={element}
                            />
                        );
                    })}
                </div>

                <div className='col-3 mt-3'>
                    {/*<button type="button" className="btn btn-dark" style={{ marginLeft: "35%" }} onClick={() => setShowCreatePostForm(!showCreatePostForm)}>{showCreatePostForm ? "Close Form" : "Create New Post"}</button>   */}
                </div>
            </div>
        </div>
    );
}
