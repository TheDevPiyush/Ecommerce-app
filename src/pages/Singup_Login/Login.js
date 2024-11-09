import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
import { browserPopupRedirectResolver, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import MyAlert from '../../components/MyAlert/MyAlert';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

export default function Login() {


    // STATES VARIABLES -

    // Input States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password')
    const [eyeType, setEyeType] = useState('fa-regular fa-eye')
    const [err, setErr] = useState({
        status: false, message: ''
    })
    const [loading, setLoading] = useState(false);

    // Input Validitation States
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [shakeTrigger, setShakeTrigger] = useState(false);

    // Hooks Call
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    // Input Validation Function -
    const validateInputs = () => {
        let valid = true;

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
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            setLoading(false)
            navigate('/', { replace: true });
        }).catch((err) => {
            setLoading(false)
            setErr({ status: true, message: err.code });
        })
    }


    // Google Login Function - (<<<<<<< NOT USED IN FINAL CODE >>>>>>>)
    const loginWithGoogle = () => {
        setLoading(true)
        signInWithPopup(auth, provider, browserPopupRedirectResolver).then((userCredentials) => {
            const credential = GoogleAuthProvider.credentialFromResult(userCredentials);
            const user = userCredentials.user;
            setDoc(doc(firestore, "Users", user.uid), {
                name: user.displayName,
                email: user.email,
                userType: 'customer',
                createdAt: new Date(),
                phoneNo: '',
                gender: '',
                userID: user.uid,
            });
            setLoading(false)
            navigate('/', { replace: true });
        }).catch((err) => {
            setLoading(false)
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
                <form action="">
                    <div id='reg-text'>
                        Registered Email
                    </div>
                    <Inputfield
                        placeholder='registeredMail@email,com'
                        required={true}
                        Style={`forminput ${!isEmailValid && shakeTrigger ? 'invalid shake' : ''}`}
                        type={'email'}
                        value={email}
                        onChange={(getValue) => { setEmail(getValue) }}
                    />

                    <div id='reg-text'>
                        Registered Password
                    </div>

                    <div className="eyediv" style={{ position: 'relative' }}>
                        <Inputfield
                            placeholder='**********'
                            required={true}
                            Style={`forminput ${!isPasswordValid && shakeTrigger ? 'invalid shake' : ''}`}
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
                            buttonTitle={loading ? 'Processing...' : 'Continue'}
                            onClick={EmailSignInFunction}
                            style={'primary signinbtn'}
                            type='submit'
                        />
                    </div>
                </form>
                <div className="border-div">

                    <div className="or-text">
                        OR
                    </div>

                    <div className="margintop" style={{ marginTop: '1.4rem' }}></div>
                    {/* <div className="info" style={{
                        fontSize: 'small',
                        textAlign: 'center',
                        color: 'gray'
                    }}>Seller can create account with Email only.</div> */}
                    {/* <MyButton
                        buttonTitle={'Sign In With Google'}
                        onClick={loginWithGoogle}
                        style={'secondary signinbtn'}
                        img={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'}
                    /> */}

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
