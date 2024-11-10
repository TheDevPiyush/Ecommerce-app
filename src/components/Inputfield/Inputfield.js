import React from 'react'
import './inputfield.scss'
export default function Inputfield(props) {
    return (
        <div>
            <input
                name={props.name}
                placeholder={props.placeholder}
                className={props.Style}
                required={props.required}
                type={props.type}
                value={props.value}
                onChange={(sendValue) => { props.onChange(sendValue.target.value) }}
            />
        </div>
    )
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d2Nobm9nZXhqbmZ6b2hha3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzg5MjIsImV4cCI6MjA0Njc1NDkyMn0.qq3iLx2iM-TLR1QWMnTwJLcKyvg6y_dROlyLf3vlt74