import React from "react";
import MenuItem from "./MenuItem";

function Menu() {
 
  
      return (
        <div className="w-90% h-full flex mx-2 flex-wrap flex-row justify-center content-center sm:gap-3 mr-4 gap-2 ">
          <MenuItem display="Main Menu" to="/" />
          <MenuItem display="Search" to="/search"/>
          
        </div>
      );
    }
    export default Menu;