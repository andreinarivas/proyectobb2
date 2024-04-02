import React, { useState, useEffect } from "react";
import { OUTLINE } from "../components/Input/styles";
import Button from "../components/Button/Button";
import { AUXILIAR, BODY, FAVORITE } from "../components/Button/styles";
import MiniTile from "../components/MiniRecipe/MiniRecipe";
import { useUserContext } from "../context/UserContext";
import { getUserInfo } from "../connect/query";
import styles from './Home.module.css'


export default function MyProfilePage() {
  const { user } = useUserContext();
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  
  const handleUserInfo = async()=>{
    const result = await getUserInfo(user.username, setInfo);
  
    console.log(info)
    setIsLoading(false);
  }
  
  
  useEffect(()=>{
    handleUserInfo();
    
  }, [isLoading])

  if(isLoading){
    return <div className={styles.container}><p className={styles.loading}>Loading...</p></div>
  }
  if(!isLoading && info!=undefined){
    console.log( info)
    return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-3/5 border-4 border-blue rounded-2xl mt-10 px-10 py-6 flex flex-col justify-between ">
        <h1 className="text-center font-black text-blue text-4xl mb-8">
         
          @{user.username}
        </h1>
        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-center content-between w-fit">
            <h2 className="font-bold">Favorite cuisines</h2>
            <div className="flex  gap-2 flex-wrap my-2">
            {info.c.map(element => {
              return <MiniTile type display={element} />
            })}
            </div>
            <h2 className="font-bold">Favorite ingredients</h2>
            <div className="flex  gap-2 flex-wrap my-2">

            {info.i.map(element => {
              return <MiniTile type display={element} />
            })}
            </div>
          </div>
          <div className="w-fit flex flex-col pl-10">
            <h2 className="font-bold text-left">Has liked...</h2>
            <div className="flex  gap-2 flex-wrap my-2 justify-start">

            {info.r.map(element => {
              return <MiniTile type display={element} />
            })}
            </div>
          </div>
        </div>
        <div className="w-fit flex flex-col justify-center">
          <h2 className="font-bold">Knows...</h2>
          <div className="flex  gap-2 flex-wrap my-2 justify-end">

          {info.f.map(element => {
              return <MiniTile  display={element} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}}
