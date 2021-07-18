import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import {Route,Switch} from "react-router-dom"
import './App.css';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Content from './components/Content';
import Home from './components/main/Home';
import AddItem from './components/main/Admin/AddItem';
import EditItem from './components/main/Admin/EditItem'
import Main from './components/main/Main';
import ViewItem from './components/main/User/ViewItem';
import Basket from './components/main/User/Basket';
import Status from './components/main/User/Status';
import SearchView from './components/main/User/SearchView';
import Search from './components/main/Search';
import Extra from './components/main/User/Extra';
export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
    navigate('/');
  }

  // First thing, check if a refreshtoken exist
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (await fetch('http://localhost:5000/refresh_token', {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
        setUser({
          accesstoken: result.accesstoken,
        });
        setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) return <div>Loading ...</div>

  return (
    <div>
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
 {/*<Navigation logOutCallback={logOutCallback} />*/}
        


         <Switch>
   <Route exact path='/Homee' component={Home}/>
   <Route exact path='/userlogin' component={Login}/>
   <Route exact path='/AddItem' component={AddItem}/>
   <Route exact path='/userprotected' component={Protected}/>
   <Route exact path='/userregister' component={Register}/>
   <Route exact path='/Main' component={Main}/>
   <Route exact path='/' component={Login}/>
   <Route exact path='/ViewItem/:id' component={ViewItem}/>
   <Route exact path='/Basket' component={Basket}/>
   <Route exact path='/Status/:id' component={Status}/>
   <Route exact path='/EditItem/:id' component={EditItem}/>
   <Route exact path='/SearchView' component={SearchView}/>
   <Route exact path='/Search' component={Search}/>
   <Route exact path='/Extra' component={Extra}/>


   </Switch> 

          

        
     
        

   

      </div>
    </UserContext.Provider>

    
        </div>
  );
}

export default App;