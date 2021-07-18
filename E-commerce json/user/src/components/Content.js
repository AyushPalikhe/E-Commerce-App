import React, { useContext } from 'react';
import { Redirect } from '@reach/router'
import { UserContext } from '../App';
import Main from './main/Main';
import Navigation from './Navigation';
 

const Content = () => {
  
  const [user] = useContext(UserContext);
  if (!user.accesstoken) return <div><Navigation/><div className="homebg"><h1 className="entry">Welcome! You need to login first</h1></div></div> 
  
  return (
  <div>
  <Navigation/>
   
   <Main/>
   
  </div>
  
  )
}

export default Content;
