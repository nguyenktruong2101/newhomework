import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NewsCard from "./NewsCard"
import TopNew from "./TopNew"

export default function BreakingNewsPage() {
    const endPoint = 'http://localhost:9000/news'
    const [numOfLoad, setNumOfLoad] = useState(1)
    const [loading, setLoading] = useState(false)
    const [newsList, setNewsList] = useState([])
    const fetchBreakingNews = () => {
        fetch(endPoint + `/breaking/all?limit=${numOfLoad*8}`).then(res => res.json()).then(data => {
            setNewsList(data)
        })
    }

    const countTimeDiff = (time) => {
        var diffTimeInMs = Date.now() - new Date(time)
        var years = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24 * 365))
        if (years > 0) {
            return `${years > 1 ? `${years} years ago` : `${years} year ago`} `
        }
        var days = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24))
        if (days > 0) {
            return `${days > 1 ? `${days} days ago` : `${days} day ago`} `
        }
        var hours = Math.floor(diffTimeInMs / (1000 * 60 * 60))
        if (hours > 0) {
            return `${hours > 1 ? `${hours} hours ago` : `${hours} hour ago`} `
        }
        var minutes = Math.floor(diffTimeInMs / (1000 * 60))
        if (minutes > 0) {
            return `${minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`} `
        }
        var seconds = Math.floor(diffTimeInMs / 1000)
        if (seconds > 0) {
            return `${seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`} `
        }
    }
    useEffect(() => {
        fetchBreakingNews()
        setLoading(false)
    }, [numOfLoad])
    return (
        <div>
            <div class="container" style={{ marginTop: "2%" }} >
                <h1>Breaking News</h1>
                {newsList.length > 0 &&
                    <div>
                        <div class="row mb-3">
                            <div className="col-2"></div>
                            <div class="col-8">
                                <div className="row">
                                    <Link to={`/articles/${newsList[0]._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                        <TopNew news={newsList[0]} createdDiffTime={countTimeDiff(newsList[0].createdAt)} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                        {newsList.length > 1 && newsList.map((eachNew, i) =>
                            { if(i > 0){
                            return <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8">
                                    <Link to={`/articles/${eachNew._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                        <NewsCard isBreaking = {true} news={eachNew} createdDiffTime={countTimeDiff(eachNew.createdAt)} />
                                    </Link>
                                </div>
                                <div className="col-2"></div>
                            </div>}
                            }
                        )}
                    </div>}
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8" style={{textAlign: "center"}}>
                        <button className="btn btn-dark" onClick={() => {setLoading(true); setNumOfLoad(numOfLoad + 1)}}> {loading ? "Loading" : "Load More"}</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}