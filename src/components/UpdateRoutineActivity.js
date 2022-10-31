import {react, useState} from "react";
import { updateActivityForRoutine } from "../api";

const UpdateRoutineActivity = ({token, routineActivityId, getMyRoutinesHelper, setActivateUpdateActivity}) => {
    const [newCount, setNewCount] = useState(0);
    const [newDuration, setNewDuration] = useState(0);

    const showButtons = () => {
        let deletebutton = document.getElementById('deleteRoutine') 
        let addbutton = document.getElementById('addActivity') 
        let editbutton = document.getElementById('editRoutine') 
        deletebutton.style.display = 'flex'
        addbutton.style.display = 'flex'
        editbutton.style.display = 'flex'
    }

    const updatedRoutineActivity = {
        count: newCount,
        duration: newDuration
    }
    async function updatedRoutineActivityHelper(){
        await updateActivityForRoutine(token, routineActivityId, updatedRoutineActivity);
        getMyRoutinesHelper();
    }
    return (
        <form className='updatingForm' onSubmit={(e) => {
            e.preventDefault();
            updatedRoutineActivityHelper();
            setActivateUpdateActivity(0);

        }}>
            <input 
                className="routineEditInput"
                type="number" 
                placeholder="Enter new count" 
                onChange={(e) => setNewCount(e.target.value)}></input>
            <input 
                className="routineEditInput" 
                type="number" 
                placeholder="Enter new duration" 
                onChange={(e) => setNewDuration(e.target.value)}></input>
            <button type="submit"  className="submitEditMyRoutines" onClick={() => showButtons()}>Submit Changes</button>
        </form>
    )
}
export default UpdateRoutineActivity;