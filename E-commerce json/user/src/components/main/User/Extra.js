import React from 'react'
import Login from '../../Login'
const Extra = () => {
    const getInfo=(data)=>{
              alert(data)
    }

    return (
      
        <div>
            <Login name={getInfo}/>
        </div>
    )
}

export default Extra
