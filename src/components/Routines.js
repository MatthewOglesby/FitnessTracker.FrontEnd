import React, { useState } from 'react';
import { getAllActivites } from '../api';
import { useParams, Link, Navigate } from 'react-router-dom';

const Routines = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const { routineID } = useParams();
  
  // const routineMatches = (routine, string) => {
  //   const { name, description } = routine;
  
  //   if ((name.includes(string)) || description.includes(string)) {
  //     return routine;
  //   }
  // }
  
  // const filteredRoutines = routines.filter(routine => routineMatches(routine, searchTerm));
  
  // const routinesToDisplay = searchTerm.length ? filteredRoutines: routines;
  
  return (
    <div>
      <div className='postBody'>
  
      </div>
    </div>
  )
}

export default Routines;
