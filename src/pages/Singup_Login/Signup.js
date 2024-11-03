import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import MyAlert from '../../components/MyAlert/MyAlert';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [accoutType, setAccountType] = useState('customer')
    const [inputType, setInputType] = useState('password')
    const [eyeType, setEyeType] = useState('fa-regular fa-eye')
    const [err, setErr] = useState({
        status: false, message: ''
    })


    // Hooks Calls
    const auth = getAuth();
    const navigate = useNavigate();


    // Email Password Login Function -
    const EmailSignInFunction = (e) => {
        e.preventDefault();
        if (email.length <= 5 || password.length <= 5) {
            setErr({ status: true, message: 'Email or Password must be longer than 5 characters' });
            return null
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('User account created:', user);
                setErr({ status: true, message: `Account created successfully for ${user.email}` });
            })
            .catch((err) => {
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
                <div id='reg-text'>
                    Enter Email
                </div>
                <form action="">
                    <Inputfield
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
                            buttonTitle={'Create Account'}
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
                            if (e.target.checked) setAccountType('seller')
                            else setAccountType('customer')
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
