import "./listitem.css";

const ListItem = ({ task }) => {

   return (   
      <li className="list">
         <label className="taskname">
            <input type="checkbox" />
            <p>{task.name}</p>
         </label>
         <p className="category">{task.category}</p>
      </li>
   );
};

export default ListItem;