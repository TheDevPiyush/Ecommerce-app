import React, { useState } from 'react';
import { firestore } from '../../firebase'; // Adjust based on your Firebase setup
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import './ProductUpload.scss';
import { useUser } from '../../Contexts/UserContext';
import Inputfield from '../../components/Inputfield/Inputfield';

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

    const handleImageUpload = async (files) => {
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
                    console.error(`Error uploading ${file.name}:`, error);
                    throw error;
                }

                const publicUrl = supabase.storage
                    .from('product-images')
                    .getPublicUrl(`${userData.userID}/${fileName}`).data.publicUrl;

                uploadedImageURLs.push(publicUrl);
            }
            return uploadedImageURLs;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.stock) {
            alert('Please fill all required fields.');
            return;
        }
        if (formData.images.length === 0) {
            alert('Please upload at least one image.');
            return;
        }

        setLoading(true);

        try {
            const productID = doc(collection(firestore, 'Products')).id; // Generate unique ID
            await setDoc(doc(firestore, 'Products', productID), {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                sellerID: userData.userID,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            alert('Product uploaded successfully!');
            setFormData({ name: '', description: '', price: '', category: '', stock: '', images: [] });
        } catch (error) {
            console.error('Error uploading product:', error);
            alert(`Error uploading product: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            alert('Please select images to upload.');
            return;
        }

        try {
            setLoading(true);
            const uploadedImageURLs = await handleImageUpload(files);
            setFormData((prevData) => ({ ...prevData, images: uploadedImageURLs }));
        } catch (error) {
            alert('Error uploading images. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-upload">
            <h2>Upload a New Product</h2>
            <form onSubmit={handleFormSubmit} className="product-form">
                <label>Product Name</label>
                <input type="text" placeholder="Keep the name concise yet presentable" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" placeholder="Describe your product, features, or functionalities" value={formData.description} onChange={handleChange} />

                <label>Price</label>
                <input type="number" placeholder="Price can be relative to your selling strategy" name="price" value={formData.price} onChange={handleChange} required />

                <label>Category</label>
                <input type="text" name="category" placeholder="Category helps buyers easily find products, e.g. Laptop, Phone, etc" value={formData.category} onChange={handleChange} />

                <label>Stock</label>
                <input type="number" name="stock" placeholder="Stock helps us to show available quantity for the product" value={formData.stock} onChange={handleChange} required />

                <label>Upload Images</label>
                <input type="file" multiple onChange={handleImageChange} />

                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
            </form>
        </div>
    );
}
