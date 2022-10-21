import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav className='navLinks'>
                <h3 className='navLinks3'>FitnessTrackr</h3>
                <Link to='/home' className='navLinks2'>Home</Link>
                <Link to='/routines' className='navLinks2'>Routines</Link>

                {
                    token ? (
                        <>
                            <Link to='/MyRoutines' className='navLinks2'>My Routines</Link>
                            <Link to='/home' onClick={() => { logout(); }} className='navLinks2'>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/register' className='navLinks2'>Register</Link>
                            <Link to='/login' className='navLinks2'>Login</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;