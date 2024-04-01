import React, {useState, useEffect} from 'react'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY, FAVORITE, TOFAVORITE } from '../components/Button/styles'
import MiniTile from '../components/MiniRecipe/MiniRecipe'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { checkFriends } from '../connect/detail'
import { getUserInfo } from '../connect/query'
import {addFriend, removeFriend} from "../connect/neo4j"

export default function ProfilePage() {
  const {user} = useUserContext();
  const {username}=useParams();
  const navigate = useNavigate();
  const [info, setDetail] =useState();
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] =useState(false);

  const handleDetail = async(username)=>{
    await checkFriends(username, user.username, setFriends);
    await getUserInfo(username, setDetail);
    setLoading(false);
  }

  const handleFriend = async(user, username)=>{
    if(!friends){
      await addFriend(user.username, username)
      setFriends(true)
    }else{
      await removeFriend(user.username, username)
      setFriends(false)
    }
  }

  const handleFavButton = ()=>{
    if(friends){
      return <Button style={FAVORITE} display="Remove from Friends"
      action={(e)=>{
        e.preventDefault()
        handleFriend(user.username, username)
       }}/>
      }else{
        
        return <Button style={TOFAVORITE} display="Add to Friends"
        action={(e)=>{
          e.preventDefault()
          handleFriend(user.username, username)
         }}/>

    }
  }

  useEffect(()=>{
    handleDetail(username)
  },[])
  useEffect(()=>{
  

  },[friends])

  if(loading){
    return<><p>cargando</p></>
  }
if(!loading && info){
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-4/5 border-4 border-blue rounded-2xl mt-10 px-10 py-6 flex flex-col justify-between '>
    
        <h1 className='text-center font-black text-blue text-4xl mb-8'> @{username}</h1>
        <div className='flex justify-between'>

        <div className='flex flex-col justify-center content-between w-fit'>
        

          <h2 className='font-bold'>Cocinas favoritas</h2>
          <div className="flex  gap-2 flex-wrap my-2">
            {info.c.map(element => {
              return <MiniTile type display={element} />
            })}
            </div>
          <h2  className='font-bold'>Ingredientes favoritos</h2>
          <div className="flex  gap-2 flex-wrap my-2">

{info.i.map(element => {
  return <MiniTile type display={element} />
})}
</div>
         </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Le ha gustado...</h2>
          {info.r.map(element => {
              return <MiniTile type display={element} />
            })}
        </div>
        </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Conoce a...</h2>
          <div className="flex  gap-2 flex-wrap my-2 justify-end">

          {info.f.map(element => {
              return <MiniTile  display={element} />
            })}
          </div>
        </div>
        {handleFavButton()}
    
       </div>
        <Button
        display="Regresar"
        style={BODY}
        action={() => { navigate(-1); }}
      />
    </div>
  )
}}
