import './Login.css'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'


export const Login = ({user, setUser, login}) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(null);

    const signup = async () => {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/new-button');
      } else {
        toast.warning("Unable to create account.");
      }
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
            <button style={{background: "-webkit-linear-gradient(#EC9F05, #FF4E00)"}} onClick={() => login(password)}> Login </button>
        </div>
    </div>
  )
}
