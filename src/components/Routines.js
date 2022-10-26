import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

const Routines = ({ activities, token, routines }) => {

  console.log(routines)

  return (
    <div>
      <div className='activityBody'>
      {routines ?
        routines.filter(routine => {
          return `${routine.name} ${routine.goal} ${routine.creatorName}`
            .toLowerCase()
        }).map((routine) => {
          return (
            <div className='activityContainer'>
              <div className='activityContainer1'>
                <h2>{routine.name}</h2>
                <p>{routine.goal}</p>
                <p>{routine.creatorName}</p>
              </div>
            </div>
          )
        }) : null
      }
      </div>
    </div>
  )
}

export default Routines;
