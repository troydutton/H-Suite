// Manager.jsx
import React, { Component } from 'react';
import Project from '../Project/Project';
import './Manager.css';

export class Manager extends Component {
  // Sample project data, replace with your project data from MongoDB
  projects = [
    {
      projectId: 1,
      projectName: 'Sample Project 1',
      authorizedUsers: ['Dumb Troy', 'Happy Haakon', 'BOOP'], // Example authorized users
      hardwareSets: [
        {
          hardwareName: "Drill Troy",
          totalCapacity: 50,
          availability: 40,
          checkedOut: 10,
        },
        {
          hardwareName: "Hammer Haakon",
          totalCapacity: 30,
          availability: 15,
          checkedOut: 15,
        },
      ],
    },
    {
      projectId: 2,
      projectName: 'Sample Project 2',
      authorizedUsers: ['Dumb Troy', 'Happy Haakon', 'BOOP'], // Example authorized users
      hardwareSets: [
        {
          hardwareName: "Toy Troy",
          totalCapacity: 50,
          availability: 40,
          checkedOut: 10,
        },
        {
          hardwareName: "Humping Haakon",
          totalCapacity: 30,
          availability: 15,
          checkedOut: 15,
        },
      ],
    },
  ];

  render() {
    return (
      <div className="manager-container">
        <h1>Project Manager</h1>
        <div className="project-grid">
          {this.projects.map((project) => (
            <Project
              project={project}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Manager;
