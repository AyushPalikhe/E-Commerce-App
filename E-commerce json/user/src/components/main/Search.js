import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from './Nav'; 
import SearchView from './User/SearchView';
 
const Search= () => {
    
    const [items, setItems] = useState ([]);
    const [query, setQuery] = useState ('');


    useEffect(() => {
        loadUsers();
    }, [query]);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:7000/items?title=${query}`)
        setItems(result.data.reverse());
    }

    loadUsers()

    return (
        <div>
        <Nav/>
        
        <SearchView getQuery={(q)=>setQuery(q)}/>
                
           <div className="cards">
           
           
    {    
                items.map((item, index) => (

                        <div key={item.id}>
                       <div className="card">
                       <Link className="link" to={`ViewItem/${item.id}`}> <img src={item.thumbnailUrl} alt="item"/></Link> 

                        
                        <h3>{item.title}</h3>
                        <h3 >Rs.{item.price}</h3>
                        
                        </div>
                        </div>
                            
                        
                     
                ))
            }
            </div> 
        </div>
    )
}

export default Search 
