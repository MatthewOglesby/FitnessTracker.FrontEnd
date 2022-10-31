import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

const Activities = ({ activities, token, navigate, fetchAllActivities }) => {

  useEffect(() => {
    fetchAllActivities();
  }, [token])

  return (
    <div className='activityBody'>
      {
        token ? (
          <div className='addButtonContainer'>
            <button className='addButton' onClick={() => navigate('/activity/create-activity')} />
          </div>

        ) : (
          <p></p>
        )
      }
      {activities ?
        activities.filter(activity => {
          return `${activity.name} ${activity.description} ${activity.id}`
            .toLowerCase()
        }).map((activity) => {
          return (
            <div className='activityContainer' key={activity.id}>
              <div className='activityContainer1'>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                <p>
                  {
                    token ?
                      <Link to={`/edit-activities/activities/${activity.id}`}>Edit Activity</Link>
                      : null
                  }
                </p>
              </div>
            </div>
          )
        }) : null
      }
    </div>
  )
}

export default Activities;