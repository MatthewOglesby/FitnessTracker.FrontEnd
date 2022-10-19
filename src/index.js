import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { getPosts, getUserDetails } from './api';
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
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    // console.log(user)
    // can log the token of login or user if interested in seeing it

    function logout() {
        window.localStorage.removeItem('token');
        setToken('')
        setUser({});
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
        if (results.success) {
            setUser(results.data);
        } else {
            console.log(results.error.message)
        }
    }

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div className='navbarLinks'>
            
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