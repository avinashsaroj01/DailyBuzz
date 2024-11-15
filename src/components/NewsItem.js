import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source} = this.props;
    return (
      <div >

            <span className="badge rounded-pill text-bg-danger" style={{left:'90%',zIndex: 1}}>{source}</span>
        <div className="card">
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
}
