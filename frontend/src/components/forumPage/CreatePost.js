export default function CreatePost() {
    return (
        <div>
            <div class="pt-3">
                <div class="card mb-4">
                    <div class="card-header text-center" id="post-{{$post->id}}">
                        CREATE NEW POST
                    </div>

                    <div class="card-body container-fluid">
                        <form>
                            <div class="row">
                                <div class="form-group mb-3 col-7">
                                    <label for="posttitle">Title</label>
                                    <input type="text" class="form-control border border-secondary" placeholder="Post Title" id="posttitle" />
                                </div>
                                <div class="form-group mb-3 col-5">
                                    <label for="inputGroupSelect01">Category</label>
                                    <div>
                                        <select class="custom-select" id="inputGroupSelect01" style={{"height": "35px"}}>
                                            <option selected>Choose Category</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="postcontent">Content</label>
                                <textarea class="form-control border border-secondary" placeholder="Post Content" id="postcontent"></textarea>
                            </div>


                            <div class="form-group mb-3">
                                <div class="custom-file">
                                    <label class="custom-file-label" for="inputGroupFile01">Upload Image</label><br/>
                                    <input type="file" class="custom-file-input" id="inputGroupFile01" />
                                </div>
                            </div>

                            <span class="pull-right">
                                &nbsp;&nbsp;
                                <button type="button" class="btn btn-primary">Upload</button>
                            </span>
                        </form>
                    </div>
                </div>



            </div>
        </div>

    )

}