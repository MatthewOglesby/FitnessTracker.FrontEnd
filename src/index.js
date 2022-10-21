import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { getAllActivities, getUserDetails } from './api';
import './style.css'

import {
    Home,
    Login,
    MyRoutines,
    Navbar,
    Register,
    Routines
} from './components'

const App = () => {
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    if (token) {
        // can log the token of login or user if interested in seeing it
        console.log(token)
    } else {
        console.log('No token here')
    }

    function logout() {
        window.localStorage.removeItem('token');
        setToken('')
        setUser({});
    }

    async function fetchAllActivities() {
        const results = await getAllActivities(token)
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
            setUser(results.token, results.message);
        } else {
            console.log(results.error)
        }
    }

    useEffect(() => {
        fetchAllActivities();
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
                    element
                />
                <Route
                    path='/routines'
                    element={<Routines activities={activities} token={token} navigate={navigate} />}
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