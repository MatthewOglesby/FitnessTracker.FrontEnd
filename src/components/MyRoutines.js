// import {React, useEffect, useState} from "react";
// import { getAllRoutines, fetchDeleteRoutine, fetchUpdateRoutines } from "../api";


// const MyRoutines = (props) => {
//     const { routines, setRoutines, user, token } = props
//     const [newName, setNewName] = useState('')
//     const [newGoal, setNewGoal] = useState('')
    
//     const handleChangeNewName = (event) => {
//         setNewName(event.target.value);
//     }

//     const handleChangeNewGoal = (event) => {
//         setNewGoal(event.target.value);
//     }

//     const myRoutinePost = async () => {
//         setRoutines(await getAllRoutines())
//     }

//     const handleDelete = async (id) => {
//         const deleteRoutine = await fetchDeleteRoutine(token, id)
//         setRoutines(routines.filter(routine => { 
//             return routine.id !== deleteRoutine.id
//         }))
//     }

//     const updateMyRoutine = async (id) => {
//         const updateRoutine = await fetchUpdateRoutines(token, newName, newGoal, id)
//         setRoutines(await getAllRoutines())
//      }

//     useEffect(() => {
//         myRoutinePost();
//     }, []);

//     return (

//         <div>
//             <h1 id="routines-header">My Routines</h1>
//         {       
//           routines.filter(routine => {
//           return routine.creatorId === user.id
//          }).map((routine => {
//          return (
//         <>
//         <div id="routine-card" key = {routine.id}>
//         <h1>{routine.name}</h1>
//         <p>{routine.goal}</p>
//         <p>By: {routine.creatorName}</p>
  
//         <button id="form-submit" onClick={()=> handleDelete(routine.id)}>Delete</button>
//         <form onSubmit={(e)=> {
//         e.preventDefault()
//         e.stopPropagation()
//         updateMyRoutine(routine.id)  
//          } }>
//           <input type="text" name="name" placeholder="name" value={newName} onChange={handleChangeNewName}></input>
//           <input type="text" name="goal" placeholder="goal" value={newGoal} onChange={handleChangeNewGoal} ></input>
//           <button id="form-submit" type="submit">Update</button>
//         </form>
//     </div>
//      </>
//      );
//     }))}
//   </div>
//  );
// };

// export default MyRoutines;
