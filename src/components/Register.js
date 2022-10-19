import React, { useState,  } from 'react'; //useNavigate?
// import { registerUser } from '../api';  need call in api


const Register = ({ setToken, navigate }) => {
    // props.setToken
    // const {setToken} = props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async () => {
      const results = await registerUser(username, password);
      if (results.success) {
        setToken(results.data.token);
        window.localStorage.setItem('token', results.data.token);
        navigate('/profile');
      } else {
        console.log(results.error.message)
      }
    }
    
    return (
     <div>   
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <input 
          type='text'
          placeholder='Enter Username'
          onChange={(event) => setUsername(event.target.value)}
        />
        <input 
          type='password'
          placeholder='Enter Password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      </div>
    )
  }
  


export default Register;