import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductPage.scss'
import { Link } from 'react-router-dom'
export default function ProductContainer(props) {
    return (
        <>
            <div className="product-page">
                {props.products.map((product, index) => (
                    <Link>
                        <ProductCard
                            key={index}
                            productTitle={product.productTitle}
                            // productImage={product.productImage}
                            productImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2hu4ULNjKPmUzePqPU4jGe743OKU2GFxRQ&s'
                            // productDescription={product.productDescription}
                            productPrice={product.productPrice}
                        // productRating={product.productRating}
                        />
                    </Link>
                ))}
            </div>
        </>
    )
}
