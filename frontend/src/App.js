import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Manager } from './Components/Manager/Manager';

// App.js


function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Manager />} />
      </Routes>
    </div>
  );
}

export default App;
