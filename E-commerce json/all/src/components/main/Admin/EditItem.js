import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams} from "react-router-dom";
 

import Nav from '../Nav';

const EditItem = () => {
    let history = useHistory();
    const {id}=useParams();
    const [item, setItem] = useState({
        title: "",
        thumbnailUrl: "",
        price: "",
        description:"",
        category:""
    });
  
    const { title,thumbnailUrl,price,description,category} = item;
    const onInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    useEffect(()=>{
        loadUser();
    }, []);
  
    const onSubmit = async e => {
      e.preventDefault();
      await axios.put(`http://localhost:7000/items/${id}`, item);
      history.push("/");
    };
  
    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:7000/items/${id}`)
     setItem(result.data)
      }

       
    return (
        <div>
        <Nav/>
        <div className="new">
            <h1>EDIT ITEM</h1>

            <form onSubmit={e=>onSubmit(e)}>
            <div className="new_user">
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
            
               

            <input type="number" placeholder="price"
            name="price"
            value={price}
            onChange={e=> onInputChange(e)}/> 

            <input type="text" placeholder="description"
            name="description"
            value={description}
            onChange={e=> onInputChange(e)}/> 

              

            <div className="gender_radio"> Gender:
            <input type="radio" id="category" checked={category=="male"} name="category" value="male"    onChange={e=> onInputChange(e)}/>
            <label for="male">Male</label> 
            <input type="radio" id="category" checked={category=="female"} name="category" value="female"   onChange={e=> onInputChange(e)}/>
            <label for="female">Female</label> 
           </div>
            <button> Update Item</button>
            
        </div>
        </form>
        </div>
        </div>
    )
}

export default EditItem
