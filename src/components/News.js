import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "us",
    category: "general",
  };
  static Props = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
      hasMore:true
    };
    document.title = ` NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

   updateNews= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20ac60bb772d40a5bb572347e2beaeee&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
      
    });

  }
  async componentDidMount() {
   this.updateNews();
  }
  handleClickPrev = async () => {
    // Using setState callback to ensure page is updated before calling updateNews
    this.setState(
      (prevState) => ({
        page: prevState.page - 1,
      }),
      () => this.updateNews()
    );
  };
  
  handleClickNext = async () => {
    // Using setState callback to ensure page is updated before calling updateNews
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => this.updateNews()
    );
  };
   capitalizeFirstLetter= (val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

fetchMoreData = async () => {
  if (!this.state.hasMore) return; // Prevent additional fetches if there's no more data

  this.setState({ loading: true });

  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20ac60bb772d40a5bb572347e2beaeee&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  
  try {
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: prevState.page + 1,
      loading: false,
      hasMore: prevState.articles.length + parsedData.articles.length < parsedData.totalResults,
    }));
  } catch (error) {
    console.error("Error fetching more data:", error);
    this.setState({ loading: false, hasMore: false }); // Stop infinite scroll on error
  }
};



  render() {
    return (
           <>
           <div className="container" style={{display:'flex',justifyContent:'center',fontFamily:"Georgia",marginTop:'4rem'}}>
          <h1 className="my-3 text-center" >
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
          </h1>

           </div>

           <InfiniteScroll
  dataLength={this.state.articles.length}
  next={this.fetchMoreData}
  hasMore={this.state.hasMore}
  loader={this.state.loading && <Spinner />}
>

  <div className="container-fluid my-1">
    <div className="row my-2">
      {this.state.articles.map((element) => {
        return (
          <div className="col-md-3" key={element.url}>
            <NewsItem
              title={element.title?.slice(0, 30) || "No Title"}
              description={element.description?.slice(0, 88) || "No Description"}
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
  }
}
