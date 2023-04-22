import React from "react";
import "./listitem.css";


const ListItem = (props) => {
   const handleCheckboxChange = () => {
     props.handleChange(props.id, props.status === 'incomplete' ? 'complete' : 'incomplete');
   };
 
   const handleDeleteClick = () => {
     props.deleteItem(props.id);
   };
 
   return (
     <div className="ListItem">
   <input className="checkbox-round" type="checkbox" checked={props.status === "complete"} onChange={handleCheckboxChange} />
      <span className="taskname">{props.task}</span>
      <span className={`label ${props.priority.toLowerCase()}`}>{props.priority}</span>

       <button onClick={handleDeleteClick}>Delete</button>
     </div>
   );
 };
 
 export default ListItem;


