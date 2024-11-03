import React, { useState } from 'react'
import Inputfield from '../../components/Inputfield/Inputfield'
import './Login.scss'
import MyButton from '../../components/Buttons/MyButton';
export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const EmailSignInFunction = () => {
        // alert("Click");
    }


    return (
        <div className="login-main">
            <div style={{
                textAlign: 'center',
                fontSize: '1.5rem'
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

                <Inputfield
                    required={true}
                    style={'forminput'}
                    type={'password'}
                    value={password}
                    onChange={(getValue) => { setPassword(getValue) }}
                />
                <div className="btn-container">
                    <MyButton
                        buttonTitle={'Continue'}
                        onClick={EmailSignInFunction}
                        style={'primary signinbtn'}
                    />
                </div>

                <div className="border-div">
                    <div className="or-text">
                        OR
                    </div>
                    <div className="margintop" style={{ marginTop: '1.4rem' }}></div>
                    <MyButton
                        buttonTitle={'Sign In With Google'}
                        onClick={EmailSignInFunction}
                        style={'secondary signinbtn'}
                        img={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'}
                    />

                    <MyButton
                        buttonTitle={'Create A New Account'}
                        onClick={EmailSignInFunction}
                        style={'secondary create-account'}
                    />
                </div>
            </div>
        </div>
    )
}
