import './Menu.css'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Menu = ({user, getProjects}) => {
    const navigate = useNavigate();

    const create_project = async () => {
        // Ask for project name and ID
        const projectName = prompt("Please enter project name:");

        const response = await fetch('/create-project', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName,
                user: user
            })
        });

      const data = await response.json();

      if (data.success) {
        toast.success("Project created.");
      } else {
        toast.warning("Unable to create project.");
      }
    }

    const join_project = async () => {
        const projectID = prompt("Please enter project ID:");
        const response = await fetch('/join-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              projectID: projectID,
              user,
          })
        });
  
        const data = await response.json();
  
        if (data.success) {
          toast.success("Joined project.");
        } else {
          toast.warning("Can't join project.");
        }
      }

    const view_projects = async () => {
        getProjects();
        navigate('/projects');
      }

    return (
        <div className='menu-container'>
            <div>
                <button className="menu-button" onClick={create_project}> Create Project </button>
            </div>
            <div>
                <button className="menu-button" onClick={join_project}> Join Project </button>
            </div>
            <div>
                <button className="menu-button" onClick={view_projects}> View Projects </button>
            </div>
        </div>
  )
}
