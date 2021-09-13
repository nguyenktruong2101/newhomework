export default function NewsCard(props) {
    return (
        <div>
            <div class="card mb-3" style={{maxWidth: "100%"}}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={`/newsUploads/${props.news.image && props.news.image}`} class="rounded-start" alt="..." style ={props.isBreaking? {"maxWidth": "280px", "maxHeight": "400px"} : {"maxWidth": "210px", "maxHeight": "500px"}}/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">{props.news.title}</h4>
                            <p class="card-text">{props.isBreaking ? (props.news.content.length > 200 ? props.news.content.substring(0, 199) + "......" : props.news.content) : (props.news.content.length > 100 ? props.news.content.substring(0, 99) + "......" : props.news.content)}</p>
                            <p class="card-text"><small class="text-muted">{props.createdDiffTime}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}