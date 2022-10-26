import React from 'react';

const Activities = ({ activities, token, navigate }) => {

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
          return `${activity.name} ${activity.description}`
            .toLowerCase()
        }).map((activity) => {
          return (
            <div className='activityContainer'>
              <div className='activityContainer1'>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
              </div>
            </div>
          )
        }) : null
      }
    </div>
  )
}

export default Activities;