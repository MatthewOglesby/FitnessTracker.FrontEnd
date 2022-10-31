import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyRoutines, attachActivityToRoutine, deleteRoutine} from "../api";




const MyRoutines = ({ token, username, myRoutines, getUsersRoutines }) => {
  
   const [activityCount, setActivityCount] = useState("");
    const getMyRoutinesHelper = async () => {
        const results = await getMyRoutines(token, username);
        setMyRoutines(results)
    };

    useEffect(() => {
        getMyRoutinesHelper()
    }, [myRoutines]);

    
    if (myRoutines.length > 0) {

        return (
            <div>
                <h2>My Routine</h2>
                    <button className="createNewRoutineButton">
                        <Link to='/CreateRoutine'>Create New Routine</Link>
                    </button>
                {myRoutines.map(routine => {
                    const {name, goal, activities, id} = routine
                       return ( 
                       <div key={id} className="myRoutine">
                            <h2>{name}</h2>
                            <p>Goal: {goal}</p>
                            <p>Public: {isPublic.toString()}</p>
                            <button> <Link to={`/EditRoutine/${routine.id}`}>Edit</Link>  </button>

                            <button onClick={(event) => {event.preventDefault(); deleteRoutine(routine.id,token); getUsersRoutines()}
                                    }>Delete</button>
                            <div className='activitiesForMyRoutine'>
                            {routine.activities.map (activity => {
                                const {name, description, duration, count} = activity
                                return (<div key={activity.id} className="activityForMyRoutine">
                                    <h4>{name}</h4>
                                    <p>{description}</p>
                                    <p>{count}</p>
                                    <p>{duration}</p>
                                </div>
                                )
                            })}
                            <div className='buttonsForMyRoutine'>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const result = attachActivityToRoutine(token, routine.id, activityOption, activityCount, activityDuration)
                                setActivityCount('')
                                setActivityDuration('')
                                getUsersRoutines()
                                setActivityOption('any')
                            }}>
                                <span className='activityDropDown'>
                                 <fieldset>
                                    <label htmlFor="selectActivity">Add Activity <span className="activityList">({ allActivities.length })</span></label>
                                    <select 
                                        name="activity" 
                                        id="selectactivity"
                                        value={activityOption} 
                                        onChange={(event) => setActivityOption(event.target.value)}>
                                        <option value="any">Any</option>
                                        {allActivities.map((activity) => {
                                            const {description, name, id} = activity;
                                            return <option key={id} className='Activity' value={id}>{name} : {description}</option>
                                            })}
                                        </select>
                                </fieldset>
                                </span>
                                <span className='activityCount'>
                                    <input
                                    type='text'
                                    placeholder='count'
                                    value={activityCount}
                                    onChange={(event)=> {setActivityCount(event.target.value)}}
                                    />
                                </span>
                                <span className='activityDuration'>
                                    <input
                                    type='text'
                                    placeholder='duration'
                                    value={activityDuration}
                                    onChange={(event)=> {setActivityDuration(event.target.value)}}
                                    />
                                </span>
<button>Submit</button>
</form>
</div>
</div>
     </div>
)})}
</div>
)
} else {
return (<div>
<hr/>
</div>
)
}
}



export default MyRoutines;