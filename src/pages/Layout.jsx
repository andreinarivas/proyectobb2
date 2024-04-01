import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { UserContext, UserContextProvider } from "../context/UserContext";
import ProtectedRoute from "../components/Protected/ProtectedRoute";
import LoadingPage from "./LoadingPage";



export default function Layout() {
  return (
    
    <div>
      <UserContextProvider>
       <LoadingPage>


        
          
            <main>
              <NavBar />
              <section className=" h-fit ">
                <Outlet />
              </section>
              
            </main>
    
       </LoadingPage>
        
    </UserContextProvider>
    </div>
  );
}