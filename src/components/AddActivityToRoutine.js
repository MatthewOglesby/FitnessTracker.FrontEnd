import {React, useState, useEffect} from "react";
import {attachActivityToRoutine, getAllActivities} from '../api'

const AddActivityToRoutine = ({routineId, setActivateAddActivity}) => {
    const [currentActivityId, setCurrentActivityId] = useState([]);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);
    const [allActivities, setAllActivities] = useState([]);
    
    async function getAllActivitiesHelper(){
      const results = await getAllActivities();
      setAllActivities(results)
    }
    useEffect(() => {
      getAllActivitiesHelper();
    }, []);
    
    async function connectActivityToRoutine(){
      const activityToAdd = {
        activityId: currentActivityId,
        count: count,
        duration: duration
      }
      await attachActivityToRoutine(routineId, activityToAdd);
      
    }
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        connectActivityToRoutine();
        setActivateAddActivity(0);

      }}>
        <fieldset className="fieldset">
        <select 
            className='selectActivity' 
            onChange={event => setCurrentActivityId(event.target.value)}>
          <option className="options">Select Activity</option>
          {
            allActivities.map((activity) => {
              return <option className="options" key={activity.id} value={activity.id}>{activity.name}</option>
            })
          }
        </select>
        </fieldset>
        <input 
            type="number" 
            className="routineEditInput" 
            placeholder="Enter Count" 
            onChange={(event) => setCount(event.target.value)}></input>
        <input 
            type="number" 
            className="routineEditInput" 
            placeholder="Enter Duration" 
            onChange={(event) => setDuration(event.target.value)}></input>
        <button type="submit" className="submitEditMyRoutines">Add</button>
      </form>
    )
  }
  
  export default AddActivityToRoutine;