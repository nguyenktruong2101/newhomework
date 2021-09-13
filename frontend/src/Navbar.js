import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import weblogo from './weblogo.png'
export default function Navbar(props) {
    const endPoint = 'http://localhost:9000/news'

    const [newsCategoryList, setNewsCategoryList] = useState([])
    const logout = () => {
        localStorage.removeItem("user");
        window.location.replace("http://localhost:3000");
    }
    const fetchAllNewsCategory = () => {
        fetch(endPoint + '/newscategory').then(res => res.json()).then(data => {
            data.sort((first, second) => {
                return first.name === 'Cases' ? -1 : second.name === 'Cases' ? 1 : 0
            })
            setNewsCategoryList(data)
        })
    }
    useEffect(() =>{
        fetchAllNewsCategory()
    },[])
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#A19882" }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ fontSize: "25px" }}><img src={weblogo} alt="" width="40" height="40" class="d-inline-block" />COVI-AWAY</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "20px" }}>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    News
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {newsCategoryList.map((eachNew) => <li><a class="dropdown-item" href={`/category/${eachNew._id}`}>{eachNew.name}</a></li>)}
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href={`/breaking`}>Breaking News</a></li>
                                </ul>    
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/forum">Forum</a>
                            </li>
                        </ul>
                        {props.isUser ? <div className="dropdown">
                            <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                                <strong>{props.currentUser.username}</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser2" data-popper-placement="top-end">
   
                                
                                {props.isReporter && <li><a class="dropdown-item" href="/articleform">Create New Article</a></li>}
                                <li><a class="dropdown-item" href={`/profile/${props.currentUser.id}`}>Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/" onClick={(e) => { e.preventDefault(); logout() }}>Sign out</a></li>
                            </ul>
                        </div> : <div><a href="/signup"><button class="btn btn-light me-2" type="button">Sign Up</button></a>
                            <a href="/login"><button class="btn btn-light" type="button">Login</button></a></div>}



                    </div>
                </div>
            </nav>
        </div>
    )
}