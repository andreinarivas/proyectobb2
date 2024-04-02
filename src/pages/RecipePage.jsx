import React, { useEffect, useState } from 'react'
import Input from '../components/Input/Input'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY, FAVORITE, TOFAVORITE } from '../components/Button/styles'
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { checkFavorite, getRecipeDetail } from '../connect/detail'
import MiniTile from '../components/MiniRecipe/MiniRecipe'
import { useUserContext } from '../context/UserContext'
import { addToFavorite, removeFavorite } from '../connect/neo4j'
import styles from './Home.module.css'

export default function RecipePage() {
  const {user}=useUserContext();
  const navigate = useNavigate();
  const {recipe_id} = useParams();
  const [detail, setDetail] =useState();
  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] =useState(false);

  const handleDetail = async(recipe_id)=>{
    await checkFavorite(user.username, recipe_id, setFavorite);
    await getRecipeDetail(recipe_id, setDetail);
    setLoading(false);
  }

  const handleFavortie = async(recipe_id, username)=>{
    if(!favorite){
      await addToFavorite(recipe_id, username)
      setFavorite(true)
    }else{
      await removeFavorite(recipe_id, username)
      setFavorite(false)
    }
  }

  const handleFavButton = ()=>{
    if(favorite){
      return <Button style={FAVORITE} display="Remove from Favorites"
      action={(e)=>{
        e.preventDefault()
        handleFavortie(recipe_id, user.username)
       }}/>
      }else{
        
        return <Button style={TOFAVORITE} display="Add to Favorites"
        action={(e)=>{
          e.preventDefault()
          handleFavortie(recipe_id, user.username)
         }}/>

    }
  }

  useEffect(()=>{
    handleDetail(recipe_id)
  },[])
  useEffect(()=>{
  
    handleFavButton()
  },[favorite])

  if(loading){
    return <div className={styles.container}><p className={styles.loading}>Loading...</p></div>
  }
  if(!loading && detail){
  return (
    <div className='flex flex-col items-center justify-center '>
    <div className='w-4/5 border-4 border-blue rounded-2xl mt-10 px-6 py-6 flex justify-between '>
    
        <div className='flex flex-col justify-center content-between w-full px-10 gap-4'>
        <h1 className='text-center font-black text-blue text-4xl mb-8'> {detail.r.name}</h1>
        <div className='mb-2'>
          <div className='grid grid-cols-3 grid-rows-1 gap-4 content-start '>
        <div className='flex flex-col'>

        <h2 className='font-bold'>Author</h2>
        <MiniTile display={detail.a.name}/>
        <h2  className='font-bold'>Cuisines</h2>
        <div>
          {detail.c.map((c)=>{
            return <MiniTile display={c.name ? c.name: "N/A"}/>
          })}
        </div>
        </div>
        <div className='flex flex-col col-span-2 pl-16'>

          <h2  className='font-bold'>Description</h2>

        <p>{detail.r.description}</p>
        </div>
          </div>
        <h2  className='font-bold mt-8'>Ingredients</h2>
        <div className='flex flex-wrap gap-2'>
          {detail.i.map((i)=>{
            return <MiniTile type display={i.name}/>
          })}
        </div>
        <h2  className='font-bold mt-6'>Keywords</h2>
        <div className='flex flex-wrap gap-2'>
          {detail.k.map((k)=>{
            return <MiniTile type display={k.name}/>
          })}
        </div>
        </div>
        
        {handleFavButton()}
        
        
       
    </div>
    
        </div>
        <Button
        display="Back"
        style={BODY}
        action={() => { navigate(-1); }}
      />
    </div>
  )
}}
