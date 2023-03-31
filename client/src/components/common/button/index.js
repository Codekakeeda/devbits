import React from 'react'
import './Button.css'

const Button = ({ active, buttonText }) => {
    return (
        <div className='button-wrapper'>
            <button className={active ? 'active' : 'inactive'} >{buttonText}</button>
        </div>
    )
}

export default Button
