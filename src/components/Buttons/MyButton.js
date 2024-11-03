import React from 'react'
import './MyButton.scss'

export default function MyButton(props) {
    return (
        <button
            className={`${props.style}`}
            onClick={props.onClick}>
            {props.buttonTitle}
            {props.img &&
                <img style={{ width: '30px', height: '30px', marginLeft:'10px'
                 }} src={props.img} alt="" />}
            {props.logo &&
                <i className={``}></i>
            }

        </button>
    )
}
