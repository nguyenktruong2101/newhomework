export default function NewsCard(props) {
    return (
        <div>
            <div className='card mb-3' style={{ maxWidth: '100%' }}>
                <div className='row g-0'>
                    <div className='col-md-4'>
                        <img
                            src={`/newsUploads/${
                                props.news.image && props.news.image
                            }`}
                            className='rounded-start'
                            alt='...'
                            style={
                                props.isBreaking
                                    ? { maxWidth: '280px', maxHeight: '400px' }
                                    : { maxWidth: '210px', maxHeight: '500px' }
                            }
                        />
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <h4 className='card-title'>{props.news.title}</h4>
                            <p className='card-text'>
                                {props.isBreaking
                                    ? props.news.content.length > 200
                                        ? props.news.content.substring(0, 199) +
                                          '......'
                                        : props.news.content
                                    : props.news.content.length > 100
                                    ? props.news.content.substring(0, 99) +
                                      '......'
                                    : props.news.content}
                            </p>
                            <p className='card-text'>
                                <small className='text-muted'>
                                    {props.createdDiffTime}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
