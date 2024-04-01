import React from 'react'
import { useUserContext } from '../context/UserContext'

export default function LoadingPage({children}) {
    const {isLoading} = useUserContext();
    if(isLoading){
        return (
            <div className='h-[100vh]'>
                <p>Cargando</p>
            </div>
          )
    }else{
        return children;
    }
 
}
