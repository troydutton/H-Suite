import './App.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Manager } from './Components/Manager/Manager';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (password) => {
    const response = await fetch('/login', {
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
      navigate('/dashboard');
    } else {
      toast.error("Invalid credentials.");
    }
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login user = {user} setUser = {setUser} login = {login} />} />
        <Route path="/dashboard" element={<Manager user = {user} />} />
      </Routes>
    </div>
  );
}

export default App;
