import React, { useState} from 'react';
import { navigate } from '@reach/router';
import Navigation from './Navigation';
import { useHistory } from 'react-router';
 
const Register = () => {
  const history=useHistory();
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:4000/register', {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })).json();
    
     if(!result.error){
         console.log(result.message);
         alert("New admin registered");
         history.push('/login')
     }
     else{
     
         console.log(result.error)
         
     }
  };

  

  const handleChange = e => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <div>
        <Navigation/>

    <div className="main_login">
      <form onSubmit={handleSubmit}>
        <h1>Admin Register</h1>
        <div className="login_input">
          <input
            value={email}
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;