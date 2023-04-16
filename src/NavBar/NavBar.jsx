
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

export const NavBar = () => {
  const { activeTab, setActiveTab } = useContext(NavContext);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

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