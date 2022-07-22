import React,{Component} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component{

    static defaultProps = {
        country : 'in',
        perPageSize : 12,
        category : 'general',
    }

    static propTypes = {
        country : PropTypes.string,
        perPageSize : PropTypes.number,
        category : PropTypes.string,
    }

    capitalize =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading:false,
            page : 1,
            totalarticles : 0
        }
        document.title = `${this.capitalize(this.props.category)} - Spider`;
    }
    async componentDidMount(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.perPageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles : parsedData.articles,
            totalarticles: parsedData.totalResults,
            loading:false
        });
        this.props.setProgress(100);

    }
    // handlePrevious = async ()=>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b753452b07464a0db5ded824f154a451&page=${this.state.page-1}&pageSize=${this.props.perPageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles : parsedData.articles,
    //         page : this.state.page - 1,
    //         loading:false
    //     });

    // }
    // handleNext = async ()=>{
    //     if(!(this.state.page  + 1 > Math.ceil(this.state.totalarticles/this.props.perPageSize))){
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b753452b07464a0db5ded824f154a451&page=${this.state.page + 1}&pageSize=${this.props.perPageSize}`;
    //         this.setState({loading:true})
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         this.setState({
    //             page : this.state.page + 1,
    //             articles : parsedData.articles,
    //             loading:false
    //         });
    //     }

    // }

    
    // {infinite scroll function}
    fetchMoreData = async () =>{
        this.setState({page : this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.perPageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : this.state.articles.concat(parsedData.articles),
            totalarticles: parsedData.totalResults,
        });
    }

    render(){
        return(
            <>
            {/* <div className='container my-5'>
               <h4 className="text-primary fs-bold mb-3">Top Headlines - From {this.capitalize(this.props.category)} </h4>
                <div className="row">
                {this.state.loading ? this.state.loading && <Spinner/> : this.state.articles.map((element)=>{
                   return <div className="col-md-4 col-11 mx-auto my-3" key={element.url}>
                   <NewsItem title={element.title} content={element.description} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} publishedAt={element.publishedAt}/>
               </div>
               })}
                </div>
            </div>
            <div className='container my-5 d-flex justify-content-between'>
                <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevious}>&larr; Previous</button>
                <button disabled={this.state.page  + 1 > Math.ceil(this.state.totalarticles/this.props.perPageSize)} type="button" className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
            </div> */}

            {/*  using infinite loading feature */}
            <div className="container mt-5">
               <h4 className="text-primary fs-bold mb-3">Top Headlines - From {this.capitalize(this.props.category)} </h4>
            </div>
            {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalarticles}
                    loader={<div className="text-center">
                    <div className="spinner-border text-primary spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>}>
                <div className='container my-5'>
                    <div className="row">
                        {this.state.articles.map((element)=>{
                            return <div className="col-md-4 col-11 mx-auto my-3" key={element.url}>
                                <NewsItem title={element.title} content={element.description} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} publishedAt={element.publishedAt}/>
                            </div>
                        })}
                    </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}
export default News;