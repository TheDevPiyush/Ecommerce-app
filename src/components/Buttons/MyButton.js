import React from 'react'
import './MyButton.scss'

export default function MyButton(props) {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            className={`${props.style}`}
            onClick={props.onClick}>
            {props.logo &&
                <i className={`${props.logo}`}></i>
            }
            {props.buttonTitle}
            {props.img &&
                <img style={{
                    width: '30px', height: '30px', marginLeft: '10px'
                }} src={props.img} alt="" />}

        </button>
    )
}
