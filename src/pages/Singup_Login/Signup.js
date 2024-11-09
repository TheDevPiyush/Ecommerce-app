import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import MyAlert from '../../components/MyAlert/MyAlert';
import { firestore } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('customer');
    const [gender, setGender] = useState(null);
    const [phoneNo, setPhoneNo] = useState('');

    const [inputType, setInputType] = useState('password')
    const [eyeType, setEyeType] = useState('fa-regular fa-eye')
    const [err, setErr] = useState({
        status: false, message: ''
    })
    const [loading, setLoading] = useState(false);


    // validitity States
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [isGenderValid, setIsGenderValid] = useState(true);

    const [shakeTrigger, setShakeTrigger] = useState(false);

    // Hooks Calls
    const auth = getAuth();
    const navigate = useNavigate();

    // Validation Function
    const validateInputs = () => {
        let valid = true;

        if (name.trim() === '') {
            setIsNameValid(false);
            valid = false;
        } else {
            setIsNameValid(true);
        }

        if (!email.includes('@') || email.trim() === '') {
            setIsEmailValid(false);
            valid = false;
        } else {
            setIsEmailValid(true);
        }

        if (password.length < 5) {
            setIsPasswordValid(false);
            valid = false;
        } else {
            setIsPasswordValid(true);
        }

        if (phoneNo.length < 10) {
            setIsPhoneValid(false);
            valid = false;
        } else {
            setIsPhoneValid(true);
        }
        if (address.trim() === '') {
            setIsAddressValid(false);
            valid = false;
        } else {
            setIsAddressValid(true);
        }
        if (!gender) {
            setIsGenderValid(false);
            valid = false;
        } else {
            setIsGenderValid(true);
        }

        return valid;
    };


    // Email Password Login Function -
    const EmailSignInFunction = (e) => {
        setLoading(true)
        e.preventDefault();

        if (!validateInputs()) {
            setShakeTrigger(true); // Trigger shake
            setTimeout(() => setShakeTrigger(false), 350);
            setLoading(false);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('User account created:', user);

                updateProfile(user, {
                    displayName: name,
                })

                setDoc(doc(firestore, "Users", user.uid), {
                    name: name,
                    email: user.email,
                    userType: userType,
                    gender: gender,
                    userID: user.uid,
                    phone: phoneNo.startsWith('+91') || phoneNo.startsWith('91') ? phoneNo : `+91${phoneNo}`,
                    address: address,
                    createdAt: new Date(),
                });

                setErr({ status: true, message: `Account created successfully for ${user.email}. You can Login now!` });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                setErr({ status: true, message: err.code });
            });
    }

    // Navigate to Login
    const NavigateToLogin = () => {
        navigate('/login')
    }

    // Change Password Field Type
    const changeInputEyeType = () => {
        if (inputType === 'password') {
            setInputType('text');
            setEyeType('fa-regular fa-eye-slash')
        }
        if (inputType === 'text') {
            setInputType('password');
            setEyeType('fa-regular fa-eye')
        }
    }

    return (
        <div className="login-main">
            {err.status &&
                <MyAlert message={err.message} errorStatus={(status) => { setErr(status) }} />
            }
            <div style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: "600"
            }}>E-Commerce
                <div style={{ fontSize: '0.9rem' }}>
                    TheDevPiyush
                </div>
            </div>

            <div className="input-container">
                <div className="login-text">
                    <h3>
                        Create a New Account
                    </h3>
                </div>
                <form>
                    <div id='reg-text'>
                        Full Name
                    </div>
                    <Inputfield
                        placeholder='John Doe'
                        required={true}
                        Style={`forminput ${!isNameValid && shakeTrigger ? 'invalid shake' : ''}`}
                        type={'text'}
                        value={name}
                        onChange={(getValue) => { setName(getValue) }}
                    />
                    <div id="reg-text">
                        Gender
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <input
                            id='male'
                            className={`${!isGenderValid && shakeTrigger ? 'invalid shake' : ''}`}
                            required
                            type="radio"
                            value="Male"
                            checked={gender === 'Male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                            htmlFor='male'>
                            Male
                        </label>


                        <input
                            id='female'
                            className={`${!isGenderValid && shakeTrigger ? 'invalid shake' : ''}`}
                            required
                            type="radio"
                            value="Female"
                            checked={gender === 'Female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor='female'>
                            Female
                        </label>


                        <input
                            id='other'
                            className={`${!isGenderValid && shakeTrigger ? 'invalid shake' : ''}`}
                            required
                            type="radio"
                            value="Other"
                            checked={gender === 'Other'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor='other'>
                            Other
                        </label>
                    </div>


                    <div id='reg-text'>
                        Current Address
                    </div>
                    <Inputfield
                        placeholder='House No, Street, City, State, PIN'
                        required={true}
                        Style={`forminput ${!isAddressValid && shakeTrigger ? 'invalid shake' : ""}`}
                        type={'address'}
                        value={address}
                        onChange={(getValue) => { setAddress(getValue) }}
                    />
                    <div id='reg-text'>
                        Phone Number
                    </div>
                    <Inputfield
                        placeholder='XXXXXXXXX'
                        required={true}
                        Style={`forminput ${!isPhoneValid && shakeTrigger ? 'invalid shake' : ""}`}
                        type={'number'}
                        value={phoneNo}
                        onChange={(getValue) => { setPhoneNo(getValue) }}
                    />


                    <div id='reg-text'>
                        Email Address
                    </div>
                    <Inputfield
                        placeholder='youremailid@email.com'
                        required={true}
                        Style={`forminput ${!isEmailValid && shakeTrigger ? 'invalid shake' : ""}`}
                        type={'email'}
                        value={email}
                        onChange={(getValue) => { setEmail(getValue) }}
                    />

                    <div id='reg-text'>
                        Choose a Strong Password
                    </div>

                    <div className="eyediv" style={{ position: 'relative' }}>
                        <Inputfield
                            placeholder='************'
                            required={true}
                            Style={`forminput ${!isPasswordValid && shakeTrigger ? 'invalid shake' : ""}`}
                            type={inputType}
                            value={password}
                            onChange={(getValue) => { setPassword(getValue) }}
                        />
                        <i style={{
                            position: 'absolute',
                            right: '10px',
                            top: '25%',
                            cursor: 'pointer',
                            scale: '1.2',
                            color: 'dodgerblue',
                            backgroundColor: 'white'
                        }} onClick={changeInputEyeType} className={eyeType}></i>
                    </div>
                    <div className="btn-container">
                        <MyButton
                            disabled={loading ? true : false}
                            buttonTitle={loading ? 'Processing...' : 'Create Account'}
                            type='submit'
                            onClick={EmailSignInFunction}
                            style={'primary signinbtn'}
                        />
                    </div>
                </form>

                <div className="border-div">

                    <div className="or-text">
                        Also
                    </div>

                    <div className="margintop" style={{ marginTop: '1.4rem' }}></div>

                    <div className="checkBox-container">
                        <label id='label' htmlFor="seller-check">I'm a Seller</label>
                        <input id='seller-check' type="checkbox" onChange={(e) => {
                            if (e.target.checked) setUserType('seller')
                            else setUserType('customer')
                        }} />
                    </div>
                    <div className="margintop" style={{ marginTop: '1.4rem' }}></div>

                    <MyButton
                        buttonTitle={'I want to Login'}
                        onClick={NavigateToLogin}
                        style={'secondary create-account'}
                    />
                </div>
            </div>
        </div >
    )
}
