import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../Nav';
import { Link } from 'react-router-dom';

import { useHistory, useParams} from "react-router-dom"
 
const Status = (props) => {
    let history = useHistory();
    const {id}=useParams();
    const [item, setItem] = useState({
      title: "",
      thumbnailUrl: "",
      price: "",  
      description:"",
      category:"",
      status:"",
      qty:""
       
    });

  
    const { title,thumbnailUrl,price,description,category,status,qty} = item;

    const [info, setInfo] = useState({
        
        status:""
         
      });

const {stat}=info

    const onInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    useEffect(()=>{
        loadUser();
       // loadStatus()
    }, []);

    const onSubmit = async e => {
      e.preventDefault();
      await axios.put(`http://localhost:1500/orders/${props.id}`, item);
      props.setActiveProduct()
      alert("Status Confirmed") 

     // history.push("/");
     };

    const loadUser=async()=>{
         
        const result=await axios.get(`http://localhost:1500/orders/${props.id}`)
     setItem(result.data)
      }

      {/*const loadStatus=async()=>{
        const result=await axios.get(`http://localhost:1800/corders/${id}`)
     setItem(result.data)
      }

      const deleteUser = async id => {
        await axios.delete(`http://localhost:1800/corders/${id}`)
        loadUser()
    }*/}
     

    return (
      <div>
       <div className="popup">
      <div className="popup_inner">
      <div className="view">
            <h1>Status Update</h1>
           
            <form onSubmit={e=>onSubmit(e)}>
             
           

            <img src={thumbnailUrl}/>
           
        
            <div className="view_box">

            <p><b>Name:</b> {title}</p>
            <p><b>Price:</b> {price}</p>
            <p><b>qty</b> {qty}</p>
            <p><b>Total Price:</b> {price*qty}</p>
            <p><b>Current Status</b> {status}</p>

            <input type="radio" id="status" checked={status=="accept"} name="status" value="accept"    onChange={e=> onInputChange(e)}/>
            <label htmlFor="accept">Accept</label> 
            <input type="radio" id="status" checked={status=="reject"} name="status" value="reject"   onChange={e=> onInputChange(e)}/>
            <label htmlFor="reject">Reject</label> 
            </div>

              
            <button type="submit"> Confirm Status</button>
           {/*<button className="link" onClick={() => deleteUser(item.id)}>Delete Status</button> */}
            
           <button onClick={()=>props.setActiveProduct()}> Close</button>

            
           
        
        </form>
        </div>  
        </div>
        </div>
        </div>
    ) 
}

export default Status
