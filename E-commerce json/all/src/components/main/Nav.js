import React, { useState } from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import { Router, navigate } from '@reach/router';

import { Link } from '@reach/router';
const Nav = ( ) => {

   const history=useHistory() 
  const [user, setUser] = useState({});
  const logOutCallback = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
    
    history.push('/');
    

  }
    return (

         
        <div className="Nav">
          {/*<Link to='/Homee'>Home</Link>
        <Link to='/AddItem'>Add Item</Link>
        <Link to='/Main'>Customer View</Link>*/}
      
        <NavLink exact activeClassName="active_class" to ='/Homee'>Home</NavLink>
        <NavLink exact activeClassName="active_class" to ='/AddItem'>Add Item</NavLink>
        <NavLink exact activeClassName="active_class" to ='/Main'>Customer View</NavLink>
        <NavLink exact activeClassName="active_class" to ='/Basket'>User Orders</NavLink>
        <button onClick={logOutCallback}>Log Out</button>
        </div>
        
    )
}

export default Nav
