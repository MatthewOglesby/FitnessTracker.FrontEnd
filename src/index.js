import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { getAllActivities, getAllRoutines, getUserDetails } from './api';
import swal from 'sweetalert';
import './style.css'

import {
    Home,
    Login,
    MyRoutines,
    Navbar,
    Register,
    Routines,
    Activities,
    CreateNewActivity,
    CreateRoutine,
    EditActivity,
    AddActivityToRoutine,
    UpdateRoutineActivity
} from './components'

const App = () => {
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);

    const navigate = useNavigate();

    if (token) {
        // can log the token of login or user if interested in seeing it
        // console.log(token)
    } else {
        // console.log('No token here')
    }

    function logout() {
        window.localStorage.removeItem('token');
        setToken('')
        setUser({});
        swal('You have been logged out!', '', "info")
    }

    async function fetchAllRoutines() {
        const results = await getAllRoutines();
        setRoutines(results)
    }

    async function fetchAllActivities() {
        const results = await getAllActivities()
        setActivities(results);
    }

    async function getMe() {
        const storedToken = window.localStorage.getItem('token')
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }

        const results = await getUserDetails(token)
        if (results) {
            setUser(results);
            setUsername(results.username);
            setUserId(results.id)
        } else {
            console.log(results.error)
        }
    }

    useEffect(() => {
        fetchAllActivities();
    }, [token])

    useEffect(() => {
        fetchAllRoutines();
    }, [token])

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token} />
            <Routes>
                <Route
                    path='/home'
                    element={<Home navigate={navigate} token={token} logout={logout} />}
                />
                <Route
                    path='/MyRoutines'
                    element={<MyRoutines token={token} navigate={navigate} username={username} />}
                />
                <Route
                    path='/routines'
                    element={<Routines fetchAllRoutines={fetchAllRoutines} routines={routines} activities={activities} token={token} navigate={navigate} />}
                />
                <Route
                    path='/routines/create-routine'
                    element={<CreateRoutine token={token} navigate={navigate} />}
                />
                <Route
                    path='/activities'
                    element={<Activities activities={activities} fetchAllActivities={fetchAllActivities} token={token} navigate={navigate} />}
                />
                <Route 
                    path='edit-activities/activities/:activityId' 
                    element={<EditActivity token={token} activities={activities} navigate={navigate} fetchAllActivities={fetchAllActivities} />}
                />
                <Route
                    path='/activity/create-activity'
                    element={<CreateNewActivity activities={activities} fetchAllActivities={fetchAllActivities} token={token} navigate={navigate} />}
                />
                <Route
                    path='/register'
                    element={<Register setToken={setToken} token={token} navigate={navigate} />}
                />
                <Route
                    path='/login'
                    element={<Login setToken={setToken} navigate={navigate} />}
                />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);