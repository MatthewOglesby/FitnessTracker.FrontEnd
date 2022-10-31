import {React, useState} from "react";

import { createRoutine } from "../api";

const CreateRoutine = ({token, navigate}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const newRoutine = {
        name: name,
        goal: goal,
        isPublic: isPublic
    }
    async function addRoutine(){
        await createRoutine(token, newRoutine);
        navigate('./MyRoutines')
    }
    return (
        <form className='createNewActivity' onSubmit={(e) => {
            preventDefault();
            addRoutine();
        }}>
            <input type='text' className='activities1' placeholder="Enter Name" onChange={(e) => setName(e.target.value)}></input>
            <input type='text' className='activities1' placeholder="Enter Goal" onChange={(e) => setGoal(e.target.value)}></input>
            <p className='publicRoutine'>Check box if you want the routine to be public:</p>
            <input type='checkbox' className="checkbox" placeholder="true" onChange={(e) => setIsPublic(e.target.checked)}></input>
            <div className='buttonContainer'>
                <button className='submitActivity'>Create</button>
            </div>

        </form>
    )
}
export default CreateRoutine