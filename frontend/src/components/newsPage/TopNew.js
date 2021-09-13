export default function TopNew(props) {
    return (
        <div class="card mb-3" style={{"width": "100%;", "height": "100%"}}>
            <img src={`/newsUploads/${props.news.image && props.news.image}`} class="card-img-top img-fluid" alt="topNew" style ={{"maxWidth": "900px", "maxHeight": "700px"}} />
            <div class="card-body">
                <h2 class="card-title">{props.news.title}</h2>
                <p class="card-text">{props.news.content.length > 500 ? props.news.content.substring(0, 499) + "......" : props.news.content}</p>
                <p class="card-text"><small class="text-muted">{props.createdDiffTime}</small></p>
            </div>
        </div>
    )
}