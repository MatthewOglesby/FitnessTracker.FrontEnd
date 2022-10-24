import React from 'react';


const Activities = ({ activities, token }) => {
    console.log(activities)
    return (
      <div>
          <h1 id= "activity-header">Activities</h1>
            { activities ?
         activities.filter(activity => {
         return `${activity.name} ${activity.description}`
         .toLowerCase()
         }).map((activity) => {
         return (
                <>
         <div id= "activity-card">
         <h2>{activity.name}</h2>
         <p>{activity.description}</p>
         </div>
         </>
          )
         }): null
        }
        </div>
    )
}
export default Activities;