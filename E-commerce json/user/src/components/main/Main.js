import React, { useEffect, useState } from 'react'
import axios from "axios";
import ReactPaginate from "react-paginate" 

import { Link, withRouter } from 'react-router-dom';
import Nav from './Nav';
 
const Main = (props) => {
    console.log(props)
     const [items, setItems] = useState([]);
    const [cat,setCat]=useState(items)
    const [pageNumber,setPageNumber]=useState(0)


    const usersPerPage=4
    const pageVisited=pageNumber*usersPerPage

    const displayUsers=items.slice(pageVisited, pageVisited+usersPerPage)
    .map((item, index) => (

        <div key={item.id}>
       <div className="card">
       <Link className="link" to={`ViewItem/${item.id}`}> <img src={item.thumbnailUrl} alt="item"/></Link> 
       
        
        <h3>{item.title}</h3>
        <h3 >Rs.{item.price}</h3>
        
        </div>
        </div>
            
        
     
)) 
     
  

   


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:7000/items`)
        setItems(result.data.reverse());
    }

     
    const filterItem= async(categItem)=>{
        const result = await axios.get(`http://localhost:7000/items`)
        const updatedItems = result.data.filter((curElem)=>{
            
            return curElem.category===categItem;
        })
        
        setItems(updatedItems.reverse())
    
    }
    
    const pageCount=Math.ceil(items.length/usersPerPage)
     const changePage=({selected})=>{
         setPageNumber(selected)
     };

    return (
        <div>
        <Nav/>
    <div className="about">
                        <h1 className="home_heading">USER SIDE</h1>
                        
                         
                        
                        <div className="filter_button">
                        <button onClick={()=> filterItem('male')}>Male</button>
                        <button  onClick={()=> filterItem('female')}>Female</button>
                        <button  onClick={()=>loadUsers()}>All</button>
                        </div>

                         
                        </div>
    <div className="cards">
    {
                displayUsers
            }
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

export default withRouter(Main)
