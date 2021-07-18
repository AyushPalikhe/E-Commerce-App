import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Status from '../Admin/Status'
import Nav from '../Nav';
const Basket = () => {

    const [items, setItems] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [activeProduct, setActiveProduct] = useState();    
 
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:1500/orders`)
        setItems(result.data.reverse());
    }



     

     

    return (
        <div>
        <Nav/>

            <div className="table">
                <h1 className="home_heading">Order List</h1>



                <table>
                    <thead>
                        <tr className="index">
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Ordered By</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            items.map((item, index) => (

                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td ><img src={item.thumbnailUrl} alt="item"/></td>
                                    <td >Rs.{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>Rs. {item.qty*item.price}</td>
                                    <td>{item.email}</td>
                                    
                                    <td> 

                                    
                                    <button onClick={()=>{setActiveProduct(item.id)}}>Status</button>
                                        {
                                            !(item.id === activeProduct) ? null : (
                                      <Status key={item.id}  setTrigger={setButtonPopup} id={item.id} setActiveProduct={setActiveProduct} /> 

                                            )
                                        }

                                  
                                     </td>
                                        
                                     
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default Basket
