// Project.jsx
import React, { Component } from 'react';
import './Project.css';

class Project extends Component {

  handleInputChange = (e, hardwareSet, inputType) => {
    this.setState({
      [hardwareSet]: { ...this.state[hardwareSet], [inputType]: parseInt(e.target.value) },
    });
  };

  handleCheckIn = (hardwareSet) => {
    const projectId = 1; // Replace with the actual project ID
    const qty = this.state[hardwareSet].inputValueCheckIn; // Use the check-in input value

    fetch(`/checkIn_hardware/${projectId}/${qty}`)
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Display the response message in a popup
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleCheckOut = (hardwareSet) => {
    const projectId = 1; // Replace with the actual project ID
    const qty = this.state[hardwareSet].inputValueCheckOut; // Use the check-out input value

    fetch(`/checkOut_hardware/${projectId}/${qty}`)
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Display the response message in a popup
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Function to toggle join/leave button and change color
  handleToggleJoinLeave = () => {
    this.setState((prevState) => ({
      isJoined: !prevState.isJoined,
    }));
  };

  // Function to toggle authorized users dropdown
  handleToggleAuthorizedUsers = () => {
    this.setState((prevState) => ({
      showAuthorizedUsers: !prevState.showAuthorizedUsers,
    }));
  };

  render() {

    const {
      projectName,
      hardwareSet1,
      hardwareSet2,
      isJoined,
      showAuthorizedUsers,
      authorizedUsers,
    } = this.props; // Access props passed from Manager component

    const {
      inputValueCheckIn: inputValueCheckIn1,
      inputValueCheckOut: inputValueCheckOut1,
      checkedOut: checkedOut1,
      totalCapacity: totalCapacity1,
    } = hardwareSet1;

    const {
      inputValueCheckIn: inputValueCheckIn2,
      inputValueCheckOut: inputValueCheckOut2,
      checkedOut: checkedOut2,
      totalCapacity: totalCapacity2,
    } = hardwareSet2;


    return (
      <div className="project-container">
        <h2>{projectName}</h2>
        <div className="hardware-sets">
          <div className="hardware-set-box">
            <h3>Hardware Set 1</h3>
            <div className="hardware-set">
              <div className="label-value-box">
                <div className="label">Availability</div>
                <div className="value">{`${checkedOut1}/${totalCapacity1}`}</div>
              </div>
            </div>
            <div className="hardware-controls">
              <input
                type="number"
                name="inputValueCheckIn"
                value={inputValueCheckIn1}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet1', 'inputValueCheckIn')}
              />
              <button onClick={() => this.handleCheckIn('hardwareSet1')}>Check In</button>
              <input
                type="number"
                name="inputValueCheckOut"
                value={inputValueCheckOut1}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet1', 'inputValueCheckOut')}
              />
              <button onClick={() => this.handleCheckOut('hardwareSet1')}>Check Out</button>
            </div>
          </div>
          <div className="hardware-set-box">
            <h3>Hardware Set 2</h3>
            <div className="hardware-set">
              <div className="label-value-box">
                <div className="label">Availability</div>
                <div className="value">{`${checkedOut2}/${totalCapacity2}`}</div>
              </div>
            </div>
            <div className="hardware-controls">
              <input
                type="number"
                name='inputValueCheckIn'
                value={inputValueCheckIn2}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet2', 'inputValueCheckIn')}
              />
              <button onClick={() => this.handleCheckIn('hardwareSet2')}>Check In</button>
              <input
                type="number"
                name="inputValueCheckOut"
                value={inputValueCheckOut2}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet2', 'inputValueCheckOut')}
              />
              <button onClick={() => this.handleCheckOut('hardwareSet2')}>Check Out</button>
            </div>
          </div>
        </div>
        <div className="button-row">
          <button
            className={isJoined ? 'leave-button' : 'join-button'} // Dynamically change button color
            onClick={this.handleToggleJoinLeave}
          >
            {isJoined ? 'Leave Project' : 'Join Project'}
          </button>
          <button onClick={this.handleToggleAuthorizedUsers}>Authorized Users</button>
          {showAuthorizedUsers && (
            <div className="authorized-users-dropdown">
              <ul>
                {authorizedUsers.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Project;
