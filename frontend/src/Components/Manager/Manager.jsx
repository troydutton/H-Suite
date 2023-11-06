// Manager.jsx
import React, { Component } from 'react';
import Project from '../Project/Project';
import './Manager.css';

class Manager extends Component {
  // Sample project data, replace with your project data from MongoDB
  projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
    // Add more projects here
  ];

  render() {
    return (
      <div className="manager-container">
        <h1>Project Manager</h1>
        <div className="project-grid">
          {this.projects.map((project) => (
            <Project key={project.id} projectName={project.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default Manager;
