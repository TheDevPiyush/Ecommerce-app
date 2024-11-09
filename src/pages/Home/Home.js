import React, { useEffect } from 'react'
import ProductContainer from '../../components/ProductsContainer/ProductContainer';
import './Home.scss'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const auth = getAuth();
    const navigate = useNavigate();


    const products = [
        {
            productTitle: 'iPhone 12 Pro Max',
            productImage: 'https://example.com/iphone12.jpg',
            productDescription: 'Latest iPhone with advanced features.',
            productPrice: 'Rs. 85000',
            productRating: '4.5 stars',
        },
        {
            productTitle: 'Samsung Galaxy S21',
            productImage: 'https://example.com/galaxyS21.jpg',
            productDescription: 'High-quality camera and great performance.',
            productPrice: 'Rs. 70000',
            productRating: '4.2 stars',
        },
        {
            productTitle: 'OnePlus 9 Pro',
            productImage: 'https://example.com/oneplus9.jpg',
            productDescription: 'Smooth display and fast charging.',
            productPrice: 'Rs. 65000',
            productRating: '4.3 stars',
        },
        {
            productTitle: 'Google Pixel 5',
            productImage: 'https://example.com/pixel5.jpg',
            productDescription: 'Pure Android experience with excellent camera.',
            productPrice: 'Rs. 60000',
            productRating: '4.1 stars',
        },
        {
            productTitle: 'Sony Xperia 1 II',
            productImage: 'https://example.com/xperia1.jpg',
            productDescription: 'Great for media consumption and photography.',
            productPrice: 'Rs. 80000',
            productRating: '4.4 stars',
        },
        {
            productTitle: 'Xiaomi Mi 11',
            productImage: 'https://example.com/mi11.jpg',
            productDescription: 'Powerful specs at an affordable price.',
            productPrice: 'Rs. 50000',
            productRating: '4.0 stars',
        },
        {
            productTitle: 'Huawei P40 Pro',
            productImage: 'https://example.com/p40pro.jpg',
            productDescription: 'Fantastic camera but no Google services.',
            productPrice: 'Rs. 75000',
            productRating: '4.3 stars',
        },
        {
            productTitle: 'Asus ROG Phone 5',
            productImage: 'https://example.com/rog5.jpg',
            productDescription: 'Top choice for mobile gaming.',
            productPrice: 'Rs. 70000',
            productRating: '4.6 stars',
        },
        {
            productTitle: 'Nokia 8.3 5G',
            productImage: 'https://example.com/nokia8.jpg',
            productDescription: 'Solid build with a clean software experience.',
            productPrice: 'Rs. 55000',
            productRating: '4.0 stars',
        },
        {
            productTitle: 'Oppo Find X3 Pro',
            productImage: 'https://example.com/findx3.jpg',
            productDescription: 'Unique design with great display.',
            productPrice: 'Rs. 85000',
            productRating: '4.4 stars',
        },
        {
            productTitle: 'Samsung Galaxy S21',
            productImage: 'https://example.com/galaxyS21.jpg',
            productDescription: 'High-quality camera and great performance.',
            productPrice: 'Rs. 70000',
            productRating: '4.2 stars',
        },
        {
            productTitle: 'OnePlus 9 Pro',
            productImage: 'https://example.com/oneplus9.jpg',
            productDescription: 'Smooth display and fast charging.',
            productPrice: 'Rs. 65000',
            productRating: '4.3 stars',
        },
        {
            productTitle: 'Google Pixel 5',
            productImage: 'https://example.com/pixel5.jpg',
            productDescription: 'Pure Android experience with excellent camera.',
            productPrice: 'Rs. 60000',
            productRating: '4.1 stars',
        },
        {
            productTitle: 'Sony Xperia 1 II',
            productImage: 'https://example.com/xperia1.jpg',
            productDescription: 'Great for media consumption and photography.',
            productPrice: 'Rs. 80000',
            productRating: '4.4 stars',
        },
        {
            productTitle: 'Xiaomi Mi 11',
            productImage: 'https://example.com/mi11.jpg',
            productDescription: 'Powerful specs at an affordable price.',
            productPrice: 'Rs. 50000',
            productRating: '4.0 stars',
        },
        {
            productTitle: 'Huawei P40 Pro',
            productImage: 'https://example.com/p40pro.jpg',
            productDescription: 'Fantastic camera but no Google services.',
            productPrice: 'Rs. 75000',
            productRating: '4.3 stars',
        },
    ];


    return (
        <div className="main">
            <ProductContainer
                products={products}
            />
        </div>
    )
}
