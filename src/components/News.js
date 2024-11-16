import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  News.defaultProps = {
    pageSize: 5,
    country: "us",
    category: "general",
  };
  News.Props = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, sethasMore] = useState(true);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    const data = await fetch(url);
    props.setProgress(50);

    const parsedData = await data.json();
    props.setProgress(70);

    console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = ` DailyBuzz - ${capitalizeFirstLetter(props.category)}`
   updateNews();
  }, []);


  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const fetchMoreData = async () => {
    if (!hasMore) return; // Prevent additional fetches if there's no more data

    setLoading(true);
     const nextPage=page+1;
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
       nextPage
    }&pageSize=${props.pageSize}`;


    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      setArticles((prevState) =>
        prevState.concat(parsedData.articles)
      ) ;
      setPage(nextPage);
        setTotalResults(parsedData.totalResults);
      setPage((prevPage) => prevPage.page + 1);
      setLoading(false);
      sethasMore(articles.length + parsedData.articles.length <
          parsedData.totalResults
      );
    } catch (error) {
      console.error("Error fetching more data:", error);
      setLoading(false);
      sethasMore(false);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Georgia",
          marginTop: "4rem",
        }}
      >
        <h1 className="my-3 text-center">
          DailyBuzz - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={loading && <Spinner />}
      >
        <div className="container-fluid my-1">
          <div className="row my-2">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title?.slice(0, 30) || "No Title"}
                    description={
                      element.description?.slice(0, 88) || "No Description"
                    }
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    newsUrl={element.url}
                    imageUrl={
                      element.urlToImage ||
                      "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
export default News;
