import React, { useRef, useState } from 'react';
import { useUser } from '../../Contexts/UserContext';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import MyButton from '../../components/Buttons/MyButton';

const Profile = () => {
    const { userData, loading, error } = useUser();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData ? userData.name : '',
        email: userData ? userData.email : '',
        gender: userData ? userData.gender : '',
        phone: userData ? userData.phone : '',
        userType: userData ? userData.userType : '',
        address: userData ? userData.address : '',
    });

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [isGenderValid, setIsGenderValid] = useState(true);

    const [shakeTrigger, setShakeTrigger] = useState(false);


    const validateInputs = () => {
        let valid = true;

        if (formData.name.trim() === '') {
            setIsNameValid(false);
            valid = false;
        } else {
            setIsNameValid(true);
        }

        if (!formData.email.includes('@') || formData.email.trim() === '') {
            setIsEmailValid(false);
            valid = false;
        } else {
            setIsEmailValid(true);
        }


        if (formData.phone.toString().length < 10) {
            setIsPhoneValid(false);
            valid = false;
        } else {
            setIsPhoneValid(true);
        }
        if (formData.address.trim() === '') {
            setIsAddressValid(false);
            valid = false;
        } else {
            setIsAddressValid(true);
        }

        return valid;
    };

    const inputRef = useRef(null);
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 200);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        const userRef = doc(firestore, 'Users', userData.userID);
        await updateDoc(userRef, {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            phone: formData.phone.startsWith('+91') || formData.phone.startsWith('91') ? formData.phone : `+91${formData.phone}`,
            userType: formData.userType,
            address: formData.address
        });
        window.location.reload();
    };

    if (loading) return <>Loading...</>;
    if (error) return <>We Faced an error, Please refresh to try again.</>;

    return (
        <div className="profile-container">
            <h2 className="profile-title">Account Details</h2>
            <div className="profile-card">
                <div className="label-container">
                    <label>Name</label>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <input
                            className={`forminput ${!isNameValid && shakeTrigger ? 'invalid shake' : ''}`}
                            type="text"
                            name="name"
                            ref={inputRef}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.name}</span>
                    )}
                </div>

                <div className="label-container">
                    <label>Email</label>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <input
                            className={`forminput ${!isEmailValid && shakeTrigger ? 'invalid shake' : ''}`}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.email}</span>
                    )}
                </div>
                <div className="label-container">
                    <label>Address
                    </label> <span style={{ fontSize: '.8rem', color: 'darkgray', textAlign: 'start' }}>Please provide a valid PIN Code along with correct address to ensure correct deliveries.</span>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <input
                            className={`forminput ${!isAddressValid && shakeTrigger ? 'invalid shake' : ''}`}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.address}</span>
                    )}
                </div>

                <div className="label-container">
                    <label>Gender</label>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <span>{userData.gender}</span>
                    )}
                </div>

                <div className="label-container">
                    <label>Contact Number</label>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <input
                            className={`forminput ${!isPhoneValid && shakeTrigger ? 'invalid shake' : ''}`}
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>

                <div className="label-container">
                    <label>Account Type</label>
                </div>
                <div className="profile-item">
                    {isEditing ? (
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                        >
                            <option value="seller">Seller</option>
                            <option value="customer">Customer</option>
                        </select>
                    ) : (
                        <span>{userData.userType}</span>
                    )}
                </div>
            </div>

            <div className="profile-actions">

                {isEditing ? (
                    <div className='save-cancel-container' style={{ display: 'flex', gap: '.5rem', width: '100%' }}>
                        <MyButton
                            buttonTitle="Save"
                            onClick={handleSave}
                            style="primary"
                        />
                        <MyButton
                            buttonTitle="Cancel"
                            onClick={handleEditToggle}
                            style="secondary"
                        />
                    </div>
                ) : (

                    <>
                        <MyButton
                            logo="fa-light fa-list"
                            buttonTitle="My Orders"
                            onClick={() => navigate('/orders')}
                            style="secondary"
                        />
                        <MyButton
                            logo="fa-light fa-shopping-cart"
                            buttonTitle="My Carts"
                            onClick={() => navigate('/cart')}
                            style="secondary"
                        />
                        <MyButton
                            logo="fa-light fa-edit"
                            buttonTitle="Edit Profile"
                            onClick={handleEditToggle}
                            style="secondary"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
