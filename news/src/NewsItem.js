import React from 'react'

const NewsItem = (props) => {
        let {title, description, imageUrl, newsUrl} = props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl? imageUrl : "https://www.hindustantimes.com/ht-img/img/2023/04/07/1600x900/london_high_commission_1680836199512_1680836212497_1680836212497.JPG"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} target = "_blank" className="btn btn-dark btn-sm" rel="noreferrer">Read More</a>
                        </div>
                </div>
            </div>
        )
}

export default NewsItem
