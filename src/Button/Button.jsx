import { useState } from "react";
import "./button.css";

const Button = ({ initialCount = 0, label, enabled, children }) => {
   const [count, setCount] = useState(initialCount);
   return enabled ? (
      <button 
      className="custom-button"
         onClick={() => {
            if (enabled) {
               setCount(count + 1);
            }
         }}
      >
         {!!children && children}
         {!!label && label}
         {count}
      </button>
   ) : (
      <p>This button is disabled</p>
   );
};

export default Button;