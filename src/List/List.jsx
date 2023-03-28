import "./list.css";

const List = (props) => {
  //  const handleEditListItem = () => {
  //   const newStatus = props.data.status === "complete" ? "incomplete" : "complete";
  //   props.completeListItem(props.data.id, newStatus);
  //  };
 
   const handleDeleteItem = () => {
     props.deleteItem(props.data.id);
   };
   const handleCheckboxChange = (event) => {
      props.completeListItem(props.data.id, event.target.checked? 'complete' : 'incomplete');
   };
   return (   
     <li className="list">
      <input className="checkbox-round" type="checkbox" checked={props.data.status === "complete"} onChange={handleCheckboxChange} />
       {props.data.name} 
     
       {/* <button onClick={handleEditListItem}>
         {props.data.status}
       </button> */}
       <button onClick={handleDeleteItem}>
         Delete
       </button>
     </li>
   );
 };
 
 export default List;
 