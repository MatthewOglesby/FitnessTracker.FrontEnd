import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getAllRoutines } from '../api';

const Routines = ({ activities, token, routines, fetchAllRoutines, navigate }) => {

  useEffect(() => {
    fetchAllRoutines();
  }, [token])

  console.log(routines)

  return (

    <div className='activityBody'>
      {
        token ? (
          <div className='addButtonContainerRoutine'>
            <button className='addButtonRoutine' onClick={() => navigate('/routines/create-routine')} />
          </div>

        ) : (
          <p></p>
        )
      }
      {routines ?
        routines.filter(routine => {
          return `${routine.name} ${routine.goal} ${routine.creatorName} ${routine.id} ${routine.activities}`
            .toLowerCase()
        }).map((routine) => {
          return (
            <div className='routineContainer' key={routine.id}>
              <div className='routineContainer1'>
                <h2>{routine.name}</h2>
                <p className='goal'>{routine.goal}</p>
                <h3>From User:</h3>
                <p className='creatorName'>{routine.creatorName}</p>
                <div className='activities'>
                  {
                    routine.activities[0] ?
                      routine.activities.map((activity1, index) => {
                        return (
                          <h6 key={index}>
                            <ul>
                              <li>Activity: {activity1.name}</li>
                              <li>Description: {activity1.description}</li>
                              <li>Duration:{activity1.duration}</li>
                              <li>Count:{activity1.count}</li>
                            </ul>
                          </h6>)

                      }) :
                      <p>No associated activities for this routine.</p>
                  }
                </div>
              </div>
            </div>
          )
        }) : null
      }
    </div>

  )
}

export default Routines;
