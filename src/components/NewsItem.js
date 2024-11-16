import React from "react";

const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date,source} = props;
    return (
      <div>

        <div className="card">
          <div>

            <span className="badge rounded-pill text-bg-danger"style={{    display: 'flex',

    justifyContent: 'flex-end',
    width: 'max-content',
    position: 'absolute',
    right: '0'}} >{source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />

          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small>
                {" "}
                By {!author ? "Author Unknow" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary bg-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;