import { react, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyRoutines, deleteRoutine, updateRoutine } from "../api";


const EditRoutine = ({ token, myRoutines, routineId, getMyRoutinesHelper, navigate }) => {

    const [currentRoutine] = myRoutines.filter((routine) => routine.id === routineId)

    const { name, goal, isPublic } = currentRoutine;

    const [newName, setNewName] = useState(name);
    const [newGoal, setNewGoal] = useState(goal);
    const [newIsPublic, setNewIsPublic] = useState(isPublic);

    async function editRoutine() {
        const updatedRoutine = {
            token: token,
            name: newName,
            goal: newGoal,
            isPublic: newIsPublic,
            id: routineId
        }
        await updateRoutine(updatedRoutine);
        getMyRoutinesHelper();

    }
    return (
        <form className='editForm' onSubmit={(event) => {
            event.preventDefault();
            editRoutine();
            console.log('I am submitted')
        }}>
            <input type='text' className="routineEditInput" placeholder="New Name" onChange={(event) => setNewName(event.target.value)}></input>
            <input type='text' className="routineEditInput" placeholder="New Goal" onChange={(event) => setNewGoal(event.target.value)}></input>
            <p>Public?</p>
            <input type='checkbox' placeholder="true" onChange={(event) => setNewIsPublic(event.target.checked)}></input>
            <button type="submit" className="submitEditMyRoutines" onClick={() => navigate('/MyRoutines')}>Submit Changes</button>
        </form>
    )
}

export default EditRoutines