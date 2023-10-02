import React, { useState } from 'react'
import './Login.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

export const Login = () => {
  
    const [action, setaction] = useState("Login");
    return (
    <div className='container'>
        <div className='header'>
            <div className='text'> {action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'> 
            <div className='input'> 
                <img src={user_icon} alt="" />
                <input type="text" placeholder='User ID'/>
            </div>
            <div className='input'> 
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Username'/>
            </div>
            <div className='input'> 
                <img src={password_icon} alt="" />
                {action === "Sign Up" ? <input type="password" placeholder='Create Password'/> : <input type="password" placeholder='Password'/>}
            </div>
        </div>
        {action === "Sign Up" ? <div></div> : <div className='forgot-password'> Forgot Password? <span>Click Here!</span></div>}
        <div className='submit-container'>
            <div className={action === "Login" ? "submit gray": "submit"} onClick={()=> {setaction("Sign Up")}}> Sign Up </div>
            <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={()=> {setaction("Login")}}> Login </div>
        </div>
        
    </div>
  )
}
