import React from 'react';
import {NavLink} from 'react-router-dom'


const Navigation = ({ logOutCallback }) => (
  <div className="nav_">
  <ul className="main_nav">
    {/*<li><NavLink exact activeClassName="active_class" to ='/'>Home</NavLink></li>*/}
    <li><NavLink exact activeClassName="active_class" to ='/login'>Login</NavLink></li>
  {/*<li> <NavLink exact activeClassName="active_class" to ='/protected'>Protected</NavLink></li>*/}
    <li> <NavLink exact activeClassName="active_class" to ='/register'>Register</NavLink></li>
  {/*<li><button onClick={logOutCallback}>Log Out</button></li>*/}  </ul>
  </div>
)

export default Navigation;




 
  
 