import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateActivity } from '../api';

const EditActivity = ({ activities, fetchAllActivities, navigate, token }) => {
  const  {activityId}  = useParams();
  
  if (activities.length) {
    const [currentActivity] = activities.filter(activity => activity.id === parseInt(activityId));

    
    const { name, description } = currentActivity;

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);


    async function editActivity() {
      const updatedActivity = {
        name: newName,
        description: newDescription,
        id: activityId
      }
    
      await updateActivity(token, updatedActivity)
      navigate('/activities')
      fetchAllActivities();
    }

    return (

      <div className='activityBody' >
        <form className='editContainer' onSubmit={(event) => {
          event.preventDefault();
          editActivity();

        }}>
          <h1>Edit Activity</h1>
          <input 
            type='text' 
            className='userorpass' 
            placeholder={name} 
            onChange={(event) => setNewName(event.target.value)}></input>
          <input 
            type='text' 
            className='userorpass' 
            placeholder={description} 
            onChange={(event) => setNewDescription(event.target.value)}></input>
          <button type="submit" className="editSubmit">Submit Changes</button>
        </form>
      </div>
    )
  }
  return <h1>Activities Loading</h1>
}

export default EditActivity;