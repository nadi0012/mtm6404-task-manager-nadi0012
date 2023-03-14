import "./navbar.css";
export const NavBar = () => {
   return (
      <nav className="nav">
         <a href="/">Home</a>
         <a href="/"> Add Item</a>
         <a href="/"> Project</a>
         <a href="/"> Trash</a>
         <a href="/"> History</a>
      </nav>
   );
};