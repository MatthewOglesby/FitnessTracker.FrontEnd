import React, { useState } from 'react';
import { createActivity } from '../api';

const createNewActivity = ({ token, fetchAllActivities, navigate }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const newActivity = {
        name,
        description,
    }

    async function addActivity() {
        const result = await createActivity(token, newActivity)
        fetchAllActivities();
        navigate('/activities')
    }

    return (
        <form className='createNewActivity'>
            <label className='createActivityLabel1'>Title</label>
            <input
                className='activities1'
                type='text'
                onChange={(event) => setName(event.target.value)} />
            <label className='createActivityLabel1'>Description</label>
            <input
                className='activities1'
                type='text'
                onChange={(event) => setDescription(event.target.value)} />
            <div className='buttonContainer'>
                <button className='submitActivity' onClick={(event) => { addActivity(); event.preventDefault() }}>Create</button>
            </div>
        </form>
    )
}

export default createNewActivity;