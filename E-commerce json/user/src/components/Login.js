import React, { useState, useContext, useEffect, createContext } from 'react';
import { navigate } from '@reach/router';
import { UserContext } from '../App';
import Navigation from './Navigation'; 
import { Link } from 'react-router-dom';
import { withRouter} from "react-router-dom"


  
 const Login = (props) => {
 

  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  


 
  const handleSubmit = async e => {
    e.preventDefault();
   
    const result = await (await fetch('http://localhost:5000/userlogin', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })).json();
    
    if (result.accesstoken) {
      setUser({
        accesstoken: result.accesstoken,
      });
      alert("You have logged in");
       
      localStorage.setItem('email', result.email)
      props.history.push(`/Main`)
     
     
    } else {
      console.log(result.error);
    }
  };

  useEffect(() => {
    console.log(user)
  }, [user])

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

     

        <h1 className="main_login_header">User Login</h1>
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
          <button type="submit">Login</button>
         
           
           
        </div>
      </form>
    </div>
    </div>
  );
 
};

export default withRouter(Login);

 