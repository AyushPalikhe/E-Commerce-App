import React, { useState } from 'react'


const Search = ({getQuery}) => {
    const [text, setText]=useState('')
    const onChange=(q)=>{
        setText(q)
        getQuery(q)
    }
    return (
        <div className="search">
        <form>
            <input type='text'
            className="search__form"
            placeholder="search for items"
            value={text}
            onChange={(e)=>onChange(e.target.value)}
            autofocus
            /> 
        </form>   
        </div>
    )
}


export default Search
