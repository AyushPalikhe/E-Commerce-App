import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate" 
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Main = () => {
    const [items, setItems] = useState([]);
    const [pageNumber,setPageNumber]=useState(0)

    const usersPerPage=4
    const pageVisited=pageNumber*usersPerPage

    const displayUsers=items.slice(pageVisited, pageVisited+usersPerPage)
    .map((item, index) => (

        <div key={item.id}>
       <div className="card">
        <img src={item.thumbnailUrl} alt="item"/> 
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
        
        setItems(updatedItems)
    
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

export default Main
