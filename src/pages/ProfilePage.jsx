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
import styles from './Home.module.css'

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
      console.log(username, user)
      await addFriend(user, username)
      setFriends(true)
    }else{
      await removeFriend(user, username)
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
    return <div className={styles.container}><p className={styles.loading}>Loading...</p></div>
  }
if(!loading && info){
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-4/5 border-4 border-blue rounded-2xl mt-10 px-10 py-6 flex flex-col justify-between '>
    
        <h1 className='text-center font-black text-blue text-4xl mb-8'> @{username}</h1>
        <div className='flex justify-between'>

        <div className='flex flex-col justify-center content-between w-fit'>
        

          <h2 className='font-bold'>Favorite cuisines</h2>
          <div className="flex  gap-2 flex-wrap my-2">
            {info.c.map(element => {
              return <MiniTile type display={element} />
            })}
            </div>
          <h2  className='font-bold'>Favorite ingredients</h2>
          <div className="flex  gap-2 flex-wrap my-2">

{info.i.map(element => {
  return <MiniTile type display={element} />
})}
</div>
         </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Has liked...</h2>
          {info.r.map(element => {
              return <MiniTile type display={element} />
            })}
        </div>
        </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Knows...</h2>
          <div className="flex  gap-2 flex-wrap my-2 justify-end">

          {info.f.map(element => {
              return <MiniTile  display={element} />
            })}
          </div>
        </div>
        {handleFavButton()}
    
       </div>
        <Button
        display="Back"
        style={BODY}
        action={() => { navigate(-1); }}
      />
    </div>
  )
}}
