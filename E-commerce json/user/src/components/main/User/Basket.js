import React, { useEffect, useState } from 'react'
import axios from "axios";
 import { Link } from 'react-router-dom';
 import Status from './Status'
 import Delete from './Delete'
import Nav from '../Nav';
import ReactPaginate from "react-paginate" 



const Basket = () => {

  
    
    const [items, setItems] = useState([]);
   
     const [buttonPopup, setButtonPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const [activeProduct, setActiveProduct] = useState();
    const [deleteProduct, setDeleteProduct] = useState();
    useEffect(() => {
        loadUsers();
        
    }, []);


    const statusUser=()=>{
        
    }

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:1500/orders`)
        setItems(result.data.reverse());
    }

     
    
     
    const deleteUser = async id => {
        await axios.delete(`http://localhost:1500/orders/${id}`)
       // await axios.delete(`http://localhost:1800/corders/${id}`)
        loadUsers()
    }

    const [pageNumber,setPageNumber]=useState(0)


    const usersPerPage=4
    const pageVisited=pageNumber*usersPerPage

    const displayUsers=items.slice(pageVisited, pageVisited+usersPerPage)
    .map((item, index) => (
                                
                               
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

            <button onClick={()=>setDeleteProduct(item.id)}>Delete</button>
            {
                !(item.id=== deleteProduct)?null: (
            <Delete key={item.id} setTrigger={setDeletePopup} id={item.id}deleteUser={deleteUser} setDeleteProduct={setDeleteProduct}/>
                )
            }
             </td>
            
           

           
            
           
        </tr>
       
    )) 
    const pageCount=Math.ceil(items.length/usersPerPage)
    const changePage=({selected})=>{
        setPageNumber(selected)
    };
     
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
                            <th>User Email</th>
                            <th>Action</th>
                             
                        </tr>
                    </thead>

                    <tbody>
                         {
                displayUsers
            }
           
            
            

                        
                    </tbody>

                </table>
            </div>
            <div className="page">
           <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}   
            containerClassName={"paginationBttns"}
            previousClassName={"previousBtn"}
            nextLinkClassName={"nxtBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}

           />
            </div>
        </div>
    )
}

export default Basket
