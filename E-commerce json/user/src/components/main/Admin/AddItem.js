import React, { useState } from 'react'
import axios from 'axios'
import Nav from '../Nav';

import { useHistory } from "react-router-dom";
const Additem = () => {
    let history = useHistory();
    const [item, setItem] = useState({
      title: "",
      thumbnailUrl: "",
      price: "",  
      description:"",
      category:"",
       
       
    });
  
    const { title,thumbnailUrl,price,description,category} = item;
    const onInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async e => {
      e.preventDefault();
      await axios.post("http://localhost:8000/items", item);
      history.push("/");
    };

    return (
      <div>
      <Nav/>
        <div className="new">
            <h1>ADD ITaaaaaaaaaaEM</h1>

            <form onSubmit={e=>onSubmit(e)}>
            <div class="new_user">
            <input type="text" placeholder="Name"
            name="title"
            value={title}
            onChange={e=> onInputChange(e)}
            />

            <input type="text" placeholder="Image Source"
            name="thumbnailUrl"
            value={thumbnailUrl}
            onChange={e=> onInputChange(e)}
            /> 

            
               

            <input type="price" placeholder="price"
            name="price"
            value={price}
            onChange={e=> onInputChange(e)}/> 

            <input type="text" placeholder="description"
            name="description"
            value={description}
            onChange={e=> onInputChange(e)}/> 
          <div className="gender_radio"> Gender:
        <input type="radio" id="category" name="category" value="male"    onChange={e=> onInputChange(e)}/>
        <label for="male">Male</label> 
         <input type="radio" id="category" name="category" value="female"    onChange={e=> onInputChange(e)}/>
        <label for="female">Female</label> 
           </div>
            <button> Add Item</button>
            
        </div>
        </form>
        </div>
        </div>
    )
}

export default Additem
