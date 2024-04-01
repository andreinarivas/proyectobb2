import React, { Children } from 'react'
import { useUserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {user, isLoading} = useUserContext();

    if(!isLoading && !user){
        return (
            <Navigate to='/login'/>
          );

    }else{
        return children;
    }
  
}
