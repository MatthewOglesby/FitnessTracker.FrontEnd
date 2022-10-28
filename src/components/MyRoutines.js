import { react, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyRoutines, deleteRoutine, updateRoutine } from "../api";

const EditRoutine = ({ token, myRoutines, routineId, getMyRoutinesHelper }) => {

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
        <form onSubmit={(e) => {
            e.preventDefault();
            editRoutine();
        }}>
            <input type='text' className="inputs" placeholder="Enter New Name" onChange={(e) => setNewName(e.target.value)}></input>
            <input type='text' className="inputs" placeholder="Enter New Goal" onChange={(e) => setNewGoal(e.target.value)}></input>
            <p>Check box if you want the routine to be public:</p>
            <input type='checkbox' className="checkbox" placeholder="true" onChange={(e) => setNewIsPublic(e.target.checked)}></input>
            <hr></hr>
            <button type="submit" name="create-routine">Submit Changes</button>
        </form>
    )
}

const MyRoutines = ({ token, username }) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [activateEdit, setActivateEdit] = useState(false)
    const getMyRoutinesHelper = async () => {
        const results = await getMyRoutines(token, username);
        setMyRoutines(results)
    };

    useEffect(() => {
        getMyRoutinesHelper()
    }, [myRoutines]);

    function handleDelete(id) {
        deleteRoutine(token, id);
    }

    if (myRoutines.length) {
        return (
            <div>
                <Link to='/create-routine' >Create New Routine</Link>
                <div className="container-allRoutines">
                    <h2>My Routines:</h2>
                    {myRoutines.map((routine) => {
                        const { id, creatorName, name, goal, isPublic, activities } = routine;

                        return (
                            <div key={id}>
                                <h2>{name}</h2>
                                <p>Creator: {creatorName}</p>
                                <p>Goal: {goal}</p>
                                <p>IsPublic: {isPublic.toString()}</p>
                                <div>
                                    <button onClick={() => setActivateEdit(!activateEdit)}>Edit Routine</button>
                                    {
                                        activateEdit && <EditRoutine token={token} myRoutines={myRoutines} routineId={id} getMyRoutinesHelper={getMyRoutinesHelper} />
                                    }
                                </div>

                                <button onClick={() => handleDelete(id)}>Delete Routine</button>
                                <div>
                                    {activities.map((activity) => {
                                        return (
                                            <div key={activity.id}>
                                                <h3>Activity:</h3>
                                                <p>Name: {activity.name}</p>
                                                <p>Description: {activity.description}</p>
                                                <p>Duration: {activity.duration}</p>
                                                <p>Count: {activity.count}</p>
                                            </div>
                                        );
                                    })}
                                </div>
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