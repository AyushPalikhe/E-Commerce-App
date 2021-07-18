 import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams} from "react-router-dom";
import Nav from '../Nav';
import { navigate } from '@reach/router';

 
  
 const ViewItem = () => {

    
    const[counter,setCounter]=useState(1)
     
    const add=()=>{
        setCounter(counter+1)
    }

    const sub=()=>{
        if(counter>1){
        setCounter(counter-1)}
    }


    let history = useHistory();
    const {id}=useParams();
    const [item, setItem] = useState({
        title: "",
        thumbnailUrl: "",
        price: "",
        description:"",
        category:"",
        qty:"",
        amount:"" ,
        total:""
         
        
         
    });
  
    const { title,thumbnailUrl,price,description,category,qty,amount,total} = item;
    
   
    const onInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    useEffect(()=>{
        loadUser();
    }, []);
  
    const onSubmit = async e => {
      
      navigate('/Basket');
      const id = Math.floor(Math.random()*10000000)
      const email=localStorage.getItem('email')
      const newItem = {...item, id: id, qty: counter,email:email,Totalprice:totalPrice}
      await axios.post("http://localhost:1500/orders", newItem);
        
       {/* history.push("/Basket");*/}
      };
  
    const loadUser=async()=>{
     
        const result=await axios.get(`http://localhost:7000/items/${id}`)
     setItem(result.data)
      }

     const totalPrice=counter*price;
      
      
      
  
    return (
       <div>
        
       <div className="view_nav">     
        <Nav/>
        </div>
         
         <div className="view_item">
        <form onSubmit={e=>onSubmit(e)}>
            <h1>Item Description</h1>
            <img src={thumbnailUrl}/>
            <div className="view_box">
            <p><b>Item Name:</b>  {title}</p>
            <p><b>Price:</b>{price}</p>
            <p><b>Category:</b> {category}</p>
            <p><b>Description:</b> {description}</p>
            <p><b>Email:</b>{localStorage.getItem('email')}</p>
             

           
           
           
           
            
          <div className="counter">
            <p><b>QTY:</b></p><button  type="button" onClick={()=>sub(counter)}>-</button>

           
           <input onChange={e=> onInputChange(e)} value={counter}/>

           
            <button type="button" onClick={()=>add(counter)}>+</button>

            <p><b>Total Cost:</b>{totalPrice}</p>  
             
            </div> 

            
           {/*<p><b>Quantity: </b><select name="qty" id="qty" value={qty} onChange={e=> onInputChange(e)} >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>

            </select></p>*/}
            

             
            
            </div>
            
           
            <button type="submit"> Add to Basket</button>

         </form>

        



             
        </div>
        </div>
    )
}

export default ViewItem
