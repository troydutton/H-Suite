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

  // const projects = [
  //   {
  //     projectId: 1,
  //     projectName: 'Sample Project 1',
  //     authorizedUsers: ['Dumb Troy', 'Happy Haakon', 'BOOP'], // Example authorized users
  //     hardwareSets: [
  //       {
  //         hardwareName: "Drill Troy",
  //         totalCapacity: 50,
  //         availability: 40,
  //         checkedOut: 10,
  //       },
  //       {
  //         hardwareName: "Hammer Haakon",
  //         totalCapacity: 30,
  //         availability: 15,
  //         checkedOut: 15,
  //       },
  //     ],
  //   },
  //   {
  //     projectId: 2,
  //     projectName: 'Sample Project 2',
  //     authorizedUsers: ['Dumb Troy', 'Happy Haakon', 'BOOP'], // Example authorized users
  //     hardwareSets: [
  //       {
  //         hardwareName: "Toy Troy",
  //         totalCapacity: 50,
  //         availability: 40,
  //         checkedOut: 10,
  //       },
  //       {
  //         hardwareName: "Humping Haakon",
  //         totalCapacity: 30,
  //         availability: 15,
  //         checkedOut: 15,
  //       },
  //     ],
  //   },
  // ];

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