import { react, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyRoutines, deleteRoutine, updateRoutine } from "../api";
import { AddActivityToRoutine, UpdateRoutineActivity } from './index'

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
            navigate('/MyRoutines')
        }}>
            <input 
                type='text' 
                className="routineEditInput" 
                placeholder="New Name" 
                onChange={(event) => setNewName(event.target.value)}></input>
            <input 
                type='text' 
                className="routineEditInput" 
                placeholder="New Goal" 
                onChange={(event) => setNewGoal(event.target.value)}></input>
            <p>Public?</p>
            <input type='checkbox' placeholder="true" onChange={(event) => setNewIsPublic(event.target.checked)}></input>
            <button type="submit" className="submitEditMyRoutines" onClick={() => { navigate('/MyRoutines') }}>Submit Changes</button>
        </form>
    )
}

const MyRoutines = ({ token, username, navigate }) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [activateEdit, setActivateEdit] = useState(false)
    const [activateAddActivity, setActivateAddActivity] = useState(0);
    const [activateUpdateActivity, setActivateUpdateActivity] = useState(0);

    const showingActivities = () => {
        let attachedactivities = document.getElementById('attachedactivities')
        attachedactivities.style.display = "block"
    }

    const closeActivity = () => {
        let attachedactivities = document.getElementById('attachedactivities')
        attachedactivities.style.display = "none"
    }

    const removeButtons = () => {
        let deletebutton = document.getElementById('deleteRoutine') 
        let addbutton = document.getElementById('addActivity') 
        let editbutton = document.getElementById('editRoutine') 
        deletebutton.style.display = 'none'
        addbutton.style.display = 'none'
        editbutton.style.display = 'none'
    }


    const getMyRoutinesHelper = async () => {
        const results = await getMyRoutines(token, username);
        setMyRoutines(results)
    };

    useEffect(() => {
        getMyRoutinesHelper()
    }, [myRoutines, activateAddActivity]);

    function handleDelete(id) {
        deleteRoutine(token, id);
    }

    if (myRoutines.length) {
        return (
            <div className='activityBody'>
                <Link to='/routines/create-routine' className="createLinkBox"><button className="createLink">Create New Routine</button></Link>
                <div className="myRoutinesBody1">
                    <div className="line"></div>
                    {myRoutines.map((routine) => {
                        const { id, creatorName, name, goal, isPublic, activities } = routine;

                        return (
                            <div key={id} className='myRoutineContainer' id="myRoutineContainer">
                                <h2>{name}</h2>
                                <p>Goal: {goal}</p>
                                <p>Public: {isPublic.toString()}</p>
                                <div className="buttonBox">
                                    <button onClick={() => { setActivateEdit(!activateEdit) }} className='editRoutine' id="editRoutine">Edit Routine</button>
                                    {
                                        activateEdit && <EditRoutine token={token} myRoutines={myRoutines} routineId={id} getMyRoutinesHelper={getMyRoutinesHelper} navigate={navigate} />
                                    }
                                    <button onClick={() => setActivateAddActivity(id)} className='editRoutine' id="addActivity">Add Activity</button>
                                    {
                                        activateAddActivity === id ? <AddActivityToRoutine routineId={id} setActivateAddActivity={setActivateAddActivity} /> : null
                                    }
                                    <button onClick={() => handleDelete(id)} className='editRoutine' id="deleteRoutine">Delete Routine</button>
                                    <button className='editRoutine' onClick={() => { showingActivities() }}>Activities</button>
                                </div>
                                
                                    {activities.map((activity) => {
                                        return (
                                            <div key={activity.id} id='attachedactivities'>
                                                <h3>Associated Activities:</h3>
                                                <p>Name: {activity.name}</p>
                                                <p>Description: {activity.description}</p>
                                                <p>Duration: {activity.duration}</p>
                                                <p>Count: {activity.count}</p>
                                                <button onClick={() => {setActivateUpdateActivity(activity.id), removeButtons()}} className='editRoutine'>Update Activity</button>
                                                {
                                                    activateUpdateActivity === activity.id ? <UpdateRoutineActivity token={token} routineActivityId={activity.routineActivityId} getMyRoutinesHelper={getMyRoutinesHelper} setActivateUpdateActivity={setActivateUpdateActivity} /> : null
                                                }
                                                <button className='editRoutine' onClick={() => { closeActivity() }}>Close</button>
                                            </div>
                                        );
                                    })}
                                
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Link to='/createroutine'>Create New Routine</Link>
                <p className="no-routines-message">You have not yet created any routines!</p>
            </div>
        )
    }
}
export default MyRoutines