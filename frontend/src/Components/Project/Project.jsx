// Project.jsx
import React, { Component } from 'react';
import './Project.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValueCheckIn1: 0, // Update state property for check-in input
      inputValueCheckOut1: 0, // Update state property for check-out input
      inputValueCheckIn2: 0, // Update state property for check-in input
      inputValueCheckOut2: 0, // Update state property for check-out input
      showAuthorizedUsers: false, // Added state for dropdown
      isJoined: false, // Added state for join/leave button
    };
  }

  handleInputChange = (e, hardwareSet, inputType) => {
    this.setState({
      [`${inputType}${hardwareSet}`]: parseInt(e.target.value),
    });
  };

  handleCheckIn = (hardwareSet) => {
    const projectId = 1; // Replace with the actual project ID
    const qty = this.state[`inputValueCheckIn${hardwareSet}`]; // Use the check-in input value

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
    const qty = this.state[`inputValueCheckOut${hardwareSet}`]; // Use the check-out input value

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
      project
    } = this.props;

    const {
      projectId,
      projectName,
      authorizedUsers,
      hardwareSets,
    } = project; // Access props passed from Manager component

    const {
      hardwareName: hardwareName1,
      totalCapacity: totalCapacity1,
      availability: availability1,
      checkedOut: checkedOut1,
    } = hardwareSets[0];

    const {
      hardwareName: hardwareName2,
      totalCapacity: totalCapacity2,
      availability: availability2,
      checkedOut: checkedOut2,
    } = hardwareSets[1];

    return (
      <div className="project-container">
        <h2>{projectName}</h2>
        <div className="hardware-sets">
          <div className="hardware-set-box">
            <h3>{hardwareName1}</h3>
            <div className="hardware-set">
              <div className="label-value-box">
                <div className="value-box">
                  <div className="label">Availability</div>
                  <div className="value">{`${availability1}/${totalCapacity1}`}</div>
                </div>
                <div className="value-box">
                  <div className="label">Checked Out</div>
                  <div className="value">{checkedOut1}</div>
                </div>
              </div>
            </div>
            <div className="hardware-controls">
              <input
                type="number"
                name="inputValueCheckIn"
                value={this.state.inputValueCheckIn1}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet1', 'inputValueCheckIn')}
              />
              <button onClick={() => this.handleCheckIn('hardwareSet1')}>Check In</button>
              <input
                type="number"
                name="inputValueCheckOut"
                value={this.state.inputValueCheckOut1}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet1', 'inputValueCheckOut')}
              />
              <button onClick={() => this.handleCheckOut('hardwareSet1')}>Check Out</button>
            </div>
          </div>
          <div className="hardware-set-box">
            <h3>{hardwareName2}</h3>
            <div className="hardware-set">
              <div className="label-value-box">
              <div className="value-box">
                  <div className="label">Availability</div>
                  <div className="value">{`${availability2}/${totalCapacity2}`}</div>
                </div>
                <div className="value-box">
                  <div className="label">Checked Out</div>
                  <div className="value">{checkedOut2}</div>
                </div>
              </div>
            </div>
            <div className="hardware-controls">
              <input
                type="number"
                name='inputValueCheckIn'
                value={this.state.inputValueCheckIn2}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet2', 'inputValueCheckIn')}
              />
              <button onClick={() => this.handleCheckIn('hardwareSet2')}>Check In</button>
              <input
                type="number"
                name="inputValueCheckOut"
                value={this.state.inputValueCheckOut2}
                onChange={(e) => this.handleInputChange(e, 'hardwareSet2', 'inputValueCheckOut')}
              />
              <button onClick={() => this.handleCheckOut('hardwareSet2')}>Check Out</button>
            </div>
          </div>
        </div>
        <div className="button-row">
          <button
            className={this.state.isJoined ? 'leave-button' : 'join-button'} // Dynamically change button color
            onClick={this.handleToggleJoinLeave}
          >
            {this.state.isJoined ? 'Leave Project' : 'Join Project'}
          </button>
          <button onClick={this.handleToggleAuthorizedUsers}>Authorized Users</button>
          {this.state.showAuthorizedUsers && (
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
