import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import MyAlert from '../../components/MyAlert/MyAlert';
import { firestore } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('customer')
    const [inputType, setInputType] = useState('password')
    const [eyeType, setEyeType] = useState('fa-regular fa-eye')
    const [err, setErr] = useState({
        status: false, message: ''
    })
    const [loading, setLoading] = useState(false);


    // Hooks Calls
    const auth = getAuth();
    const navigate = useNavigate();


    // Email Password Login Function -
    const EmailSignInFunction = (e) => {
        setLoading(true)
        e.preventDefault();
        if (email.length <= 0 || password.length <= 0 || name.length <= 0) {
            return null
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
                    createdAt: new Date()
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
                <MyAlert message={err.message} errorStatus={(status) => { setErr(status); navigate('/login') }} />
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
                <form action="">
                    <div id='reg-text'>
                        Enter Full Name
                    </div>
                    <Inputfield
                        placeholder='John Doe'
                        required={true}
                        style={'forminput'}
                        type={'text'}
                        value={name}
                        onChange={(getValue) => { setName(getValue) }}
                    />
                    <div id='reg-text'>
                        Enter Email
                    </div>
                    <Inputfield
                        placeholder='youremailid@email.com'
                        required={true}
                        style={'forminput'}
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
                            style={'forminput'}
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
