import "./navbar.css";
import { Link } from "react-router-dom"

export const NavBar = () => {
   return (
      <ul className="nav">
         <li>
            <Link to="/">Home</Link>
         </li>
         <li>
            <Link to="/">Task</Link>
         </li>
         <li>
            <Link to="/">Project</Link>
         </li>
         <li>
            <Link to="/">Trash</Link>
         </li>
         <li>
            <Link to="/">History</Link>
         </li>

      </ul>
   );
};

export default NavBar;