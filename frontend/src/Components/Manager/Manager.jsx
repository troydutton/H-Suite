// Manager.jsx
import Project from '../Project/Project';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Manager.css';

export const Manager = ({user, projects}) => {
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
      })
    });

    const data = await response.json();

    navigate('/');
  }

  return (
    <div className="manager-container">
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
      <h1>Project Manager</h1>
      <div className="project-grid">
        {projects.map((project) => (
          <Project
            project={project}
          />
        ))}
      </div>
    </div>
  );
}