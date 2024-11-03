import React from 'react'
import './inputfield.scss'
export default function Inputfield(props) {
    return (
        <div>
            <input
                id={props.style}
                required={props.required}
                type={props.type}
                value={props.value}
                onChange={(sendValue) => { props.onChange(sendValue.target.value) }}
            />
        </div>
    )
}
