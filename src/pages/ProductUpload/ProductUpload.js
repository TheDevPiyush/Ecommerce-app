import React, { useState } from 'react';
import { firestore } from '../../firebase'; // Adjust based on your Firebase setup
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import './ProductUpload.scss';
import { useUser } from '../../Contexts/UserContext';

// Initialize Supabase client
const supabase = createClient('https://bxwchnogexjnfzohakxa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d2Nobm9nZXhqbmZ6b2hha3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzg5MjIsImV4cCI6MjA0Njc1NDkyMn0.qq3iLx2iM-TLR1QWMnTwJLcKyvg6y_dROlyLf3vlt74');

export default function ProductUpload() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [],
    });
    const { userData } = useUser();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const ProductImgUploadToSupabase = async (e) => {
        console.log('selected')
        e.preventDefault();
        setLoading(true);

        const files = Array.from(e.target.files);
        const uploadedImageURLs = [];

        try {
            for (const file of files) {
                const fileName = `${Date.now()}-${file.name}`;
                const { data, error } = await supabase.storage
                    .from('product-images')
                    .upload(`${userData.userID}/${fileName}`, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (error) {
                    throw new Error(`Error uploading ${file.name}: ${error.message}`);
                }

                const publicUrl = supabase.storage
                    .from('product-images')
                    .getPublicUrl(`${userData.userID}/${fileName}`).data.publicUrl;
                uploadedImageURLs.push(publicUrl);
            }

            setFormData((prevData) => ({ ...prevData, images: uploadedImageURLs }));
            productDetailsUploadToFirebase(e, uploadedImageURLs)
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error uploading images. Please try again.');
            setLoading(false);
            return null; // Return null if failed

        }
    };



    const productDetailsUploadToFirebase = async (e, uploadedImageURLs) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.stock) {
            alert('Please fill all required fields');
            return;
        }

        try {
            const productID = doc(collection(firestore, 'Products')).id; // Generate unique ID
            await setDoc(doc(firestore, 'Products', productID), {
                ...formData,
                images: uploadedImageURLs, // Ensure images are included here
                sellerID: userData.userID,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            setLoading(false);
            alert('Product uploaded successfully!');
            setFormData({ name: '', description: '', price: '', category: '', stock: '', images: [] });
        } catch (error) {
            setLoading(false);
            console.error('Error uploading product:', error);
            alert('Error uploading product:', error.message);
        }
    };


    return (
        <div className="product-upload">
            <h2>Upload a New Product</h2>
            <form onSubmit={ProductImgUploadToSupabase} className="product-form">
                <label>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />

                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />

                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} />

                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

                <label>Upload Images</label>
                <input type="file" multiple onChange={ProductImgUploadToSupabase} />

                <button type="submit" disabled={loading} >
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
            </form>
        </div>
    );
}
