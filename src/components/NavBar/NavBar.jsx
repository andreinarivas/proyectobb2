
import React, { useEffect } from "react";
import Menu from "./Menu/Menu";
import logo from "./logoBDD2.svg";
import Boton from "../Button/Button";
import { PRINCIPAL } from "../Button/styles";
import { useUserContext } from "../../context/UserContext";
export default function NavBar(){
    const {user} = useUserContext();

    const handleUser= ()=>{
      if(!user){

        return <Boton style={PRINCIPAL} display="Log In" to='/login'/>
      }else{
        return <Boton style={PRINCIPAL} display="My profile" to='/myprofile'/>
      }

    }
    useEffect(()=>{}, [user])
    
    return (
    <div className=" h-fit  overflow-clip">
     
      <div className="h-fit bg-blue border-b-2 md:h-32 border-blue p-4 place-content-center flex flex-row justify-between">
        <div className="overflow-hidden flex content-center justify-center m-2">
          <img className="h-inherit md:w-56 object-fit"src={logo}  />
        </div>
        <Menu />
        {handleUser()}
        
      </div>
    </div>
  );
}