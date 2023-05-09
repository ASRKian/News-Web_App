import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6b12feddebc44ed3bfde5d2f0443ac59&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(40);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - news`;
        updateNews()
    }, [])

    //if we want to use next or previous button instead of infinite scroll, we can use these functions

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    // const handlePreviousClick = async () => {
    //     setPage(page - 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6b12feddebc44ed3bfde5d2f0443ac59&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading1(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading1(false);
    };

    return (
        <>
            <h2  style = {{marginTop: "69px",textAlign: "center"}}>Top Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading1 && <Spinner />}
            >
                <div className='container'>
                    <div className="row">
                        {articles && articles.map((e) => {
                            return e && <div className="col-md-4 my-3" key={e.url}>
                                <NewsItem title={e.title ? (e.title.slice(0, 65) + "...") : ""} description={e.description ? (e.description.slice(0, 75) + "...") : ""} imageUrl={e.urlToImage} newsUrl={e.url} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-3">
                    <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous Page</button>
                    <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next Page &rarr;</button>
                </div> */}
        </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

export default News
