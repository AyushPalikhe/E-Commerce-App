import React, { useEffect, useState } from 'react'
import axios from "axios";
 
import ReactPaginate from "react-paginate" 
 
import { Link } from 'react-router-dom';
import Nav from './Nav';
const Home = () => {

    const [items, setItems] = useState([]);
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
            <td>
           
                <button> <Link className="link" to={`EditItem/${item.id}`}>Edit</Link></button>
              
                <button className="link" onClick={() => deleteUser(item.id)}>Delete</button>
            </td>
        </tr>
    ))


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:7000/items`)
        setItems(result.data.reverse());
    }

    const deleteUser = async id => {
        await axios.delete(`http://localhost:7000/items/${id}`)
        loadUsers()
    }
     

    const pageCount=Math.ceil(items.length/usersPerPage)
    const changePage=({selected})=>{
        setPageNumber(selected)
    };
    return (
        <div>
        <Nav/>

            <div className="table">
                <h1 className="home_heading">ADMIN SIDE</h1>



                <table>
                    <thead>
                        <tr className="index">
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
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
            <div className="paginate_home">
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

export default Home
