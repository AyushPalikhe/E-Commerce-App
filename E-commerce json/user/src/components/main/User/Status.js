import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../Nav';
import { useHistory, useParams} from "react-router-dom"
 

const Status = (props) => {
  console.log(props.id)
    let history = useHistory();
   // const {id}=useParams();
    const [item, setItem] = useState({
      title: "",
      thumbnailUrl: "",
      price: "",  
      description:"",
      category:"",
      status:"",
      qty:"",
      email:""
    });

  
    const { title,thumbnailUrl,price,description,category,status,qty,email} = item;

    const [info, setInfo] = useState({
        
        status:""
         
      });

const {stat}=info

    const onInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    useEffect(()=>{
        loadUser();
        loadStatus();
       
    }, []);

    const onSubmit = async e => {
      e.preventDefault();
      await axios.post("http://localhost:1800/corders", item);
      alert("Status Confirmed") 
     };

    const loadUser=async()=>{
       const element=props.id
        const result=await axios.get(`http://localhost:1500/orders/${props.id}`)
     setItem(result.data)
      }

      const loadStatus=async()=>{
        const result=await axios.get(`http://localhost:1500/orders/${props.id}`)
        console.log(result.data)
     setItem(result.data)
      }
      
 
    return(
      <div>
      <div className="popup">
      <div className="popup_inner">
      <div className="view">
            <h1>Item Status</h1>
           
            <form onSubmit={e=>onSubmit(e)}>
             
           

            <img src={thumbnailUrl}/>
           
        
            <div className="view_box">

            <p><b>Name:</b> {title}</p>
            <p><b>Price:</b> {price}</p>
            <p><b>qty</b> {qty}</p>
            <p><b>Total Price:</b> {price*qty}</p>

            <p><b>Current Status</b> {status}</p>
            <p><b>Ordered By:</b> {email}</p>
             

           
            </div>
          
            <button onClick={()=>props.setActiveProduct(null)}> Close</button>
        
        </form>
        
        </div>
        </div>
         </div>
        </div>
    )
}

export default Status
