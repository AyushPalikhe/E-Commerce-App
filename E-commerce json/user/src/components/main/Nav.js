import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { Router, navigate } from '@reach/router';
import { useHistory} from "react-router-dom"

import { Link } from '@reach/router';
const Nav = ( ) => {
  let history = useHistory();
    const [user, setUser] = useState({});
    const logOutCallback = async () => {
        await fetch('http://localhost:5000/logout', {
          method: 'POST',
          credentials: 'include', // Needed to include the cookie
        });
        // Clear user from context
        setUser({});
        // Navigate back to startpage
        history.push(`/userlogin`)
      }

    return (

         
        <div className="Nav">
        <NavLink exact activeClassName="active_class" to ='/Main'>Items View</NavLink>
        <NavLink exact activeClassName="active_class" to ='/Basket'>My Basket</NavLink>
        <button onClick={logOutCallback}>Log Out</button>
         </div>
        
    )
}

export default Nav
