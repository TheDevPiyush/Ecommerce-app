import React from 'react';
import './MyAlert.scss';
import MyButton from '../Buttons/MyButton';

export default function MyAlert({ message, errorStatus }) {
    if (!message) return null;

    const getErrorMessage = (message) => {
        switch (message) {
            case 'auth/user-not-found':
                return "No user found with this email.";
            case 'auth/invalid-password':
                return "Incorrect password. Please try again.";
            case 'auth/invalid-email':
                return "The email address is not valid.";
            case 'auth/email-already-in-use':
                return "This email is already associated with another account.";
            case 'auth/email-already-exists':
                return "This email is already associated with another account.";
            case 'auth/weak-password':
                return "Password is too weak. Please use a stronger password.";
            case 'auth/too-many-requests':
                return "Too many unsuccessful attempts. Please try again later.";
            case 'auth/network-request-failed':
                return "Network error. Check your connection and try again.";
            case 'auth/invalid-credential':
                return `Please check the entered credentials again. ${message}`;
            case 'auth/popup-closed-by-user':
                return 'Google Sign in was cancelled';
            default:
                return message;
        }
    };

    return (
        <div className="alert-container">
            {getErrorMessage(message)}
            <br />
            <div className="divv" style={{ float: 'right' }}>
                <MyButton buttonTitle="Got It" style="secondary" onClick={errorStatus} />
            </div>

        </div>
    );
}
