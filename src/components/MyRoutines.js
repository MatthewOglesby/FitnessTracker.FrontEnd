// import {React, useEffect, useState} from "react";
// import { getAllRoutines, deleteRoutine, updateRoutine } from "../api";


// const MyRoutines = ({routines, activities, token, user}) => {
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

//     const handleDelete = async (token) => {
//         const deleteRoutines = await deleteRoutine(token)
//         setRoutines(routines.filter(routine => { 
//             return routine.Id !== deleteRoutine.id
//         }))
//     }

//     const updateMyRoutine = async (Id) => {
//         const updateRoutines = await updateRoutine(token, newName, newGoal, Id)
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
//           return routine.creatorId === user.Id
//          }).map((routine => {
//          return (
//         <>
//         <div id="routine-card" key = {routine.Id}>
//         <h1>{routine.name}</h1>
//         <p>{routine.goal}</p>
//         <p>By: {routine.creatorName}</p>
  
//         <button id="form-submit" onClick={()=> handleDelete(routine.Id)}>Delete</button>
//         <form onSubmit={(e)=> {
//         e.preventDefault()
//         e.stopPropagation()
//         updateMyRoutine(routine.Id)  
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
