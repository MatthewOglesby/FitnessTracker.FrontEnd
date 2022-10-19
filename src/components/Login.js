import React, { useState } from 'react';
import { loginUser } from '../api';


const Login = (({ setToken, navigate }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
<h3 style ={{color:"blue"}}>Welcome to Fitness Tracker!</h3>

  const handleSubmit = async () => {
    const results = await loginUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/home');
    } else {
      console.log(results.error.message)
    }
  }
    return(
    
        <form id='loginform' onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}>
            <input type="text"
             placeholder='Enter Username'
             onChange={(event) => setUsername(event.target.value)}
            />
             <input type="Password"
             placeholder='Enter Password'
             onChange={(event) => setPassword(event.target.value)}
            />
            <button type='submit'>Submit</button>
        </form>
     
    )
})
export default Login;
