import React, { useContext } from 'react';
import { Redirect } from '@reach/router'
import { UserContext } from '../App';
import Home from './main/Home'; 
const Content = () => {
  
  const [user] = useContext(UserContext);
  if (!user.accesstoken) return <div className="homebg"><h1 className="entry">Welcome Admin! You need to login first</h1></div> 
  return (
  <div>
    
   <Home/>
   
  </div>
  
  )
}

export default Content;
