import React, { useState } from 'react'
import './Login.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'

export const Login = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    const login = async () => {
        await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: user,
            password: password
          })
        })
      }

      const signup = async () => {
        await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: user,
            password: password
          })
        })
      }

    return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Login</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'> 
            <div className='input'> 
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Username' onChange={(e) => setUser(e.target.value)}/>
            </div>
            <div className='input'> 
                <img src={password_icon} alt="" />
                {<input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>}
            </div>
        </div>
        <div className='submit-container'>
            <button style={{background: "#eaeaea", color: "gray"}} onClick={signup}> Sign Up </button>
            <button style={{background: "-webkit-linear-gradient(#EC9F05, #FF4E00)"}} onClick={login}> Login </button>
        </div>
    </div>
  )
}
