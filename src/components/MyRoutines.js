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

const MyRoutines = ({ token, username, navigate }) => {
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
            <div className='myRoutinesBody'>
                <Link to='/routines/create-routine' className="createLinkBox"><button className="createLink">Create New Routine</button></Link>
                <div className="myRoutinesBody1">
                    <div className="line"></div>
                    {myRoutines.map((routine) => {
                        const { id, creatorName, name, goal, isPublic, activities } = routine;

                        return (
                            <div key={id} className='myRoutineContainer'>
                                <h2>{name}</h2>
                                <p>Goal: {goal}</p>
                                <p>Public: {isPublic.toString()}</p>
                                <div>
                                    <button onClick={() => setActivateEdit(!activateEdit)} className='editRoutine'>Edit Routine</button>
                                    {
                                        activateEdit && <EditRoutine token={token} myRoutines={myRoutines} routineId={id} getMyRoutinesHelper={getMyRoutinesHelper} navigate={navigate} />
                                    }
                                    <button onClick={() => handleDelete(id)} className='deleteRoutine'>Delete Routine</button>
                                </div>

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
//below is the button for editing the duration. I will need to map over the previous duration
<div>
<h3>Edit Activity To Routine</h3>

<select onChange={(event) => setActivityId(event.target.value)}>
  {defaultActivities.map((activity) => (
    <option key={activity.id} value={activity.id}>
      {activity.name}
    </option>
  ))}
</select>
<fieldset>
  <label>Count: </label>
  <input
    type="number"
    placeholder="number-of-repetitions"
    onChange={(event) => setCount(event.target.value)}
  ></input>
</fieldset>
<fieldset>
  <label>Duration: </label>
  <input
    type="number"
    placeholder="number-of-minutes"
    onChange={(event) => setDuration(event.target.value)}
  ></input>
</fieldset>
</div>
// <div>
// 						  <button
// 							onClick={() => {
// 							  editActivity(activity.routineActivityId);
// 							}}
// 						  >
// 							Edit Activity Duration
// 						  </button>
// 						  <button
// 							onClick={async () => {
// 							  await durationActivity(
// 								activity.routineActivityId,
                            
// 								token
// 							  );
// 							}}
// 						  >
// 							Edit Activity Duration
// 						  </button>
// 						</div>

//delete an activity from a routine
async function deleteActiity(id) {
    let response = await delete(BASE_URL + '/routines/' + id,
    {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

}


export default MyRoutines
