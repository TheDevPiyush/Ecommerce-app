import React from 'react'
import './ProductCard.scss'
export default function ProductCard(props) {
    return (
        <div className='productCard-container'>
            <div className="product-image">
                <img src={props.productImage} alt="" />
            </div>
            <div className="product-title">
                {props.productTitle}
            </div>
            <div className="product-description">
                {props.productDescription}
            </div>
            <div className="product-price">
                {props.productPrice}
            </div>
            <div className="product-rating">
                {props.productRating}
            </div>
        </div>
    )
}
