import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import NewsCard from "./NewsCard"
import TopNew from "./TopNew"

export default function CategorizedNews() {
    let { cateId } = useParams()
    const endPoint = 'http://localhost:9000/news'
    const [newsCategoryInfo, setNewsCategoryInfo] = useState()
    const [numOfLoad, setNumOfLoad] = useState(1)
    const [loading, setLoading] = useState(false)
    const [newsList, setNewsList] = useState([])
    const fetchCategorizedNews = () => {
        fetch(endPoint + `/specific/${cateId}?limit=${numOfLoad*8}`).then(res => res.json()).then(data => {
            setNewsList(data)
        })
    }
    const fetchCategoryInfo = () => {
        fetch(endPoint + `/category/${cateId}`).then(res => res.json()).then(data => {
            setNewsCategoryInfo(data)
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
        fetchCategoryInfo()
    }, [])
    useEffect(() => {
        fetchCategorizedNews();
        setLoading(false)
    }, [numOfLoad])
    return (
        <div>
            <div class="container" style={{ marginTop: "2%" }} >
                <h1>{newsCategoryInfo && newsCategoryInfo.name}</h1>
                {newsList.length > 0 &&
                    <div>
                        <div class="row mb-3">
                            <div class="col-8">
                                <div className="row">
                                    <Link to={`/articles/${newsList[0]._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                        <TopNew news={newsList[0]} createdDiffTime={countTimeDiff(newsList[0].createdAt)} />
                                    </Link>
                                </div>
                            </div>
                            <div class="col-4">
                                {newsList.length > 1 &&
                                    <Link to={`/articles/${newsList[1]._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                        <TopNew news={newsList[1]} createdDiffTime={countTimeDiff(newsList[1].createdAt)} />
                                    </Link>
                                }
                            </div>
                        </div>
                        {newsList.length > 2 && newsList.map((eachNew, newsIndex) => {
                            if (newsIndex % 2 === 0 && newsIndex > 1) {
                                return <div className="row">
                                    <div className="col-6">
                                        <Link to={`/articles/${newsList[newsIndex]._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                            <NewsCard news={newsList[newsIndex]} createdDiffTime={countTimeDiff(newsList[newsIndex].createdAt)} />
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        {(newsIndex + 1) < newsList.length &&
                                            <Link to={`/articles/${newsList[newsIndex + 1]._id}`} style={{ "textDecoration": "none", "color": "black" }}>
                                                <NewsCard news={newsList[newsIndex + 1]} createdDiffTime={countTimeDiff(newsList[newsIndex + 1].createdAt)} />
                                            </Link>
                                        }
                                    </div>
                                </div>
                            }
                        })}
                    </div>}
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8" style={{ textAlign: "center" }}>
                        <button className="btn btn-dark" onClick={() => { setLoading(true); setNumOfLoad(numOfLoad + 1) }}> {loading ? "Loading" : "Load More"}</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}