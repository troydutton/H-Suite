// Project.jsx
import React, { useState } from 'react';
import './Project.css';

const Project = ({ project: initialProject }) => {
  const [project, setProject] = useState(initialProject);

  const [inputValueCheckIn1, setInputValueCheckIn1] = useState(0);
  const [inputValueCheckOut1, setInputValueCheckOut1] = useState(0);
  const [inputValueCheckIn2, setInputValueCheckIn2] = useState(0);
  const [inputValueCheckOut2, setInputValueCheckOut2] = useState(0);
  const [showAuthorizedUsers, setShowAuthorizedUsers] = useState(false);
  const [isJoined, setIsJoined] = useState(false);


  const { projectId, projectName, hardwareSets, authorizedUsers } = project;

  const { hardwareName: hardwareName1, totalCapacity: totalCapacity1, availability: initialAvailability1, checkedOut: checkedOut1 } = hardwareSets[0];
  const { hardwareName: hardwareName2, totalCapacity: totalCapacity2, availability: initialAvailability2, checkedOut: checkedOut2 } = hardwareSets[1];

  const [availability1, setAvailability1] = useState(initialAvailability1);
  const [availability2, setAvailability2] = useState(initialAvailability2);

  const handleCheckOut1 = async () => {
    const response = await fetch('/checkout1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        qty: inputValueCheckOut1,
        project: project
      })
    });

    const data = await response.json();

    if (data.success) {
      setProject(data.project);
      setAvailability1(data.availability);
    }

  };

  const handleCheckIn1 = async () => {
    const response = await fetch('/checkin1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        qty: inputValueCheckIn1,
        project: project
      })
    });
    const data = await response.json();

    if (data.success) {
      setProject(data.project);
      setAvailability1(data.availability);
    }
  };

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
              className='inputBox'
              type="number"
              name="inputValueCheckIn"
              onChange={(e) => setInputValueCheckIn1(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckIn1('hardwareSet1')}>Check In</button>
            <input
              type="number"
              name="inputValueCheckOut"
              onChange={(e) => setInputValueCheckOut1(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckOut1('hardwareSet1')}>Check Out</button>
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
            <button className="check-Button" onClick={() => handleCheckIn1('hardwareSet2')}>Check In</button>
            <input
              type="number"
              name="inputValueCheckOut"
              onChange={(e) => setInputValueCheckOut2(e.target.value)}
            />
            <button className="check-Button" onClick={() => handleCheckOut1('hardwareSet2')}>Check Out</button>
          </div>
        </div>
      </div>
      <div className="button-row">
        <button
          className={isJoined ? 'leave-button' : 'join-button'} // Dynamically change button color
          onClick={handleToggleJoinLeave}
        >
          {isJoined ? 'Leave Project' : 'Join Project'}
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
  );
}

export default Project; 