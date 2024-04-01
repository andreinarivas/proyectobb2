import React, { useEffect, useState } from 'react'
import RecipeDetail from '../components/RecipeDetail/RecipeDetail'
import { getRecByFriends, getRecByRecipe } from '../connect/query'
import { useUserContext } from '../context/UserContext'

export default function HomePage() {
  const {user} = useUserContext();
  const [isLoading, setIsLoadin]= useState(true);
  const [recRecipe, setRecRecipe] = useState([]);
  const [recFriends, setRecFriends]=useState([]);
  const handleInfo=async()=>{
    await getRecByRecipe(user.username, setRecRecipe)
    await getRecByFriends(user.username, setRecFriends)
    setIsLoadin(false)
  }

  useEffect(()=>{
    handleInfo()
  },[])

  if(isLoading){
    return <><p>cargando</p></>
  }
  if(!isLoading && recRecipe )
  return (
    <div className='bg-white px-20 py-16'>
        <h1 className='text-yellow py-8 text-3xl font-bold'>Porque te gusta probar cosas nuevas...</h1>
        <div className='flex flex-wrap gap-4 justify-center'>

        {recRecipe.map((r)=>{
         
          return <RecipeDetail recipe={r}/>
        })}
        </div>
        <h1 className='text-yellow py-8 text-3xl font-bold'>Prueba con tus amigos !</h1>
        <div className='flex flex-wrap gap-4 justify-center'>

        {recFriends.map((r)=>{
          
          return <RecipeDetail recipe={r}/>
        })}
        </div>
    </div>
  )
}
