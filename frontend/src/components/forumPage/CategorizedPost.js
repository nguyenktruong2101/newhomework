import Sidebar from './Sidebar';
import Post from './Post';
import { useParams } from 'react-router';
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';
import { countTimeDiff } from '../../utils';

export default function CategorizedPost(props) {
    const [categorizedPosts, setCategorizedPosts] = useState([]);
    const [sortedPostArray, setSortedPostArray] = useState([]);
    let { categorized_id } = useParams();
    const endPoint = `http://localhost:9000/categorize/categorize_post/${categorized_id}`;
    //const [haveRender, setHaveRender] = useState(false)
    //const [postUserInfo, setPostUserInfo] = useState({})
    // const fetchPostUser = (userId) => {
    //     var newElement = {}
    //     fetch(`http://localhost:9000/profile/${userId}`)
    //     .then(res => res.json())
    //     .then(data => setPostUserInfo({username: data.username}))
    // }
    const fetchCategorizedPost = () => {
        console.log('some');
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                //setCategorizedPosts(data)
                console.log(data);
                console.log('hello');
                data.map(async (postElement) => {
                    var newElement = {};
                    await fetch(
                        `http://localhost:9000/profile/profiledetails/${postElement.user_id}`
                    )
                        .then((res) => res.json())
                        .then(
                            (dataProfile) =>
                                (newElement = {
                                    ...postElement,
                                    username: dataProfile.username,
                                    followers: dataProfile.followers,
                                })
                        )
                        .then((res) =>
                            setCategorizedPosts((categorizedPosts) => [
                                ...categorizedPosts,
                                res,
                            ])
                        );
                });
            });
    };

    const sortPostArray = () => {
        var newPostArray = [...categorizedPosts];
        newPostArray.sort((first, second) => {
            return new Date(second.createdAt) - new Date(first.createdAt);
        });
        setSortedPostArray(newPostArray);
    };

    useEffect(() => {
        fetchCategorizedPost();
    }, []);

    useEffect(() => {
        sortPostArray();
    }, [categorizedPosts]);

    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
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
                    {sortedPostArray.map((element, i) => {
                        return (
                            <Post
                                key={i}
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
