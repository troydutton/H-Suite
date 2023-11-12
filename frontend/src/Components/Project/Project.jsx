// Project.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Project.css';
import 'react-toastify/dist/ReactToastify.css';

const Project = ({cur_user, project: initialProject}) => {
  const [project, setProject] = useState(initialProject);

  const [inputValueCheckIn1, setInputValueCheckIn1] = useState(0);
  const [inputValueCheckOut1, setInputValueCheckOut1] = useState(0);
  const [inputValueCheckIn2, setInputValueCheckIn2] = useState(0);
  const [inputValueCheckOut2, setInputValueCheckOut2] = useState(0);
  const [showAuthorizedUsers, setShowAuthorizedUsers] = useState(false);
  const [isJoined, setIsJoined] = useState(true);

  const { projectId, projectName, hardwareSets, authorizedUsers } = project;
  const user = cur_user;

  const { hardwareName: hardwareName1, totalCapacity: totalCapacity1, availability: initialAvailability1, checkedOut: checkedOut1 } = hardwareSets[0];
  const { hardwareName: hardwareName2, totalCapacity: totalCapacity2, availability: initialAvailability2, checkedOut: checkedOut2 } = hardwareSets[1];

  const [availability1, setAvailability1] = useState(initialAvailability1);
  const [availability2, setAvailability2] = useState(initialAvailability2);

  const handleCheckOut = async (hardware_index) => {
    const response = await fetch('/checkout', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        project: project,
        qty: hardware_index ? inputValueCheckOut2 : inputValueCheckOut1,
        hardware_index: hardware_index
      })
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Checked out hardware.");
      setProject(data.project);
      if (hardware_index == 0) {
        setAvailability1(data.availability);
      } else {
        setAvailability2(data.availability);
      }
    } else {
      toast.error("Unable to check out hardware.");
    }
  };

  const handleCheckIn = async (hardware_index) => {
    const response = await fetch('/checkin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        project: project,
        qty: hardware_index ? inputValueCheckIn2 : inputValueCheckIn1,
        hardware_index: hardware_index
      })
    });

    const data = await response.json();

    if (data.success) {
      setProject(data.project);
      if (hardware_index == 0) {
        setAvailability1(data.availability);
      } else {
        setAvailability2(data.availability);
      }
      toast.success("Checked in hardware.");
    } else {
      toast.error("Unable to check in hardware.");
    }
  };

  const leave_project = async () => {
    const projectID = project.projectId;

    const response = await fetch('/leave-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
          projectID: projectID,
          user: user

      })
    }); 
    const data = await response.json();

    if (data.success) {
      toast.success("Left project.");
      setIsJoined((prevState) => !prevState);
    } else {
      toast.warning("Can't leave project.");
    }
  }

  const handleToggleJoinLeave = () => {
    setIsJoined((prevState) => !prevState);
  };

  // Function to toggle authorized users dropdown
  const handleToggleAuthorizedUsers = () => {
    setShowAuthorizedUsers((prevState) => !prevState);
  };

  return (
    <div>
      {isJoined ? 
    <div className="project-container">
      <h2>{`${projectName} (${projectId})`}</h2>
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
              className='inputBox'
              type="number"
              name="inputValueCheckIn"
              onChange={(e) => setInputValueCheckIn1(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckIn(0)}>Check In</button>
            <input
              type="number"
              name="inputValueCheckOut"
              onChange={(e) => setInputValueCheckOut1(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckOut(0)}>Check Out</button>
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
              onChange={(e) => setInputValueCheckIn2(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckIn(1)}>Check In</button>
            <input
              type="number"
              name="inputValueCheckOut"
              onChange={(e) => setInputValueCheckOut2(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckOut(1)}>Check Out</button>
          </div>
        </div>
      </div>
      <div className="button-row">
        <button
          className={isJoined ? 'leave-button' : 'join-button'} // Dynamically change button color
          onClick={handleToggleJoinLeave && leave_project }>Leave Project
        </button>
        <button className="authorizedUsers-button" onClick={handleToggleAuthorizedUsers}>Authorized Users</button>
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
      :
       null}
    </div>

  );
}

export default Project; 