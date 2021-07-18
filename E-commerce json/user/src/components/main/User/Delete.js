import React from 'react'

const Delete = (props) => {
    return (
        
        <div className="popup">
      <div className="popup_inner"> 
      <div className="delete_item">
             <h3>Do you want to delete this item?</h3><br/>
            <button className="link" onClick={() => {
            props.deleteUser(props.id)
            props.setDeleteProduct(null)}}>Yes</button>
            <button onClick={()=>props.setDeleteProduct(null)}> No</button>
        </div>
        </div>
        </div>
    ) 
}

export default Delete
