// Manager.jsx
import React, { Component } from 'react';
import Project from '../Project/Project';
import './Manager.css';

export class Manager extends Component {
  // Sample project data, replace with your project data from MongoDB
  projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
    // Add more projects here
  ];

  state = {
    projectName: 'Sample Project',
    hardwareSet1: {
      totalCapacity: 50,
      checkedOut: 10,
      inputValueCheckIn: 0, // Update state property for check-in input
      inputValueCheckOut: 0, // Update state property for check-out input
    },
    hardwareSet2: {
      totalCapacity: 30,
      checkedOut: 5,
      inputValueCheckIn: 0, // Update state property for check-in input
      inputValueCheckOut: 0, // Update state property for check-out input
    },
    isJoined: false, // Added state for button state
    showAuthorizedUsers: false, // Added state for dropdown visibility
    authorizedUsers: ['User 1', 'User 2', 'User 3'], // Example authorized users
  };

  render() {
    return (
      <div className="manager-container">
        <h1>Project Manager</h1>
        <div className="project-grid">
          {this.projects.map((project) => (
            <Project
              // key={project.id}
              state={this.state}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Manager;
