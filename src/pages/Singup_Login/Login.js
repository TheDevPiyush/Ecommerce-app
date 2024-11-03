import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
import { browserPopupRedirectResolver, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import MyAlert from '../../components/MyAlert/MyAlert';

export default function Login() {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password')
    const [eyeType, setEyeType] = useState('fa-regular fa-eye')
    const [err, setErr] = useState({
        status: false, message: ''
    })
    // Hooks Call
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();


    // Email Password Login Function -
    const EmailSignInFunction = (e) => {
        e.preventDefault();
        if (email.length <= 5 || password.length <= 5) {
            setErr({ status: true, message: 'Email or Password must be longer than 5 characters' });
            return null;
        }
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user;
            navigate('/');
        }).catch((err) => {
            setErr({ status: true, message: err.code });
        })
    }


    // Google Login Function - 
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider, browserPopupRedirectResolver).then((userCredentials) => {
            const credential = GoogleAuthProvider.credentialFromResult(userCredentials);
            const token = credential.accessToken;
            const user = userCredentials.user;

        }).catch((err) => {
            setErr({ status: true, message: err.code });
        })
    }


    // Navigate to sign up page

    const NavigateToSignUP = () => {
        navigate('/register')
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
                fontWeight: '600'
            }}>E-Commerce
                <div style={{ fontSize: '0.9rem' }}>
                    TheDevPiyush
                </div>
            </div>

            <div className="input-container">
                <div className="login-text">
                    <h3>
                        Login
                    </h3>
                </div>
                <div id='reg-text'>
                    Registered Email
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
                        Registered Password
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
                            buttonTitle={'Continue'}
                            onClick={EmailSignInFunction}
                            style={'primary signinbtn'}
                        />
                    </div>
                </form>
                <div className="border-div">

                    <div className="or-text">
                        OR
                    </div>

                    <div className="margintop" style={{ marginTop: '1.4rem' }}></div>

                    <MyButton
                        buttonTitle={'Sign In With Google'}
                        onClick={loginWithGoogle}
                        style={'secondary signinbtn'}
                        img={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'}
                    />

                    <MyButton
                        buttonTitle={'Create A New Account'}
                        onClick={NavigateToSignUP}
                        style={'secondary create-account'}
                    />
                </div>
            </div>
        </div>
    )
}
