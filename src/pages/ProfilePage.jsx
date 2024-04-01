import React from 'react'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY, FAVORITE } from '../components/Button/styles'
import MiniTile from '../components/MiniRecipe/MiniRecipe'

export default function ProfilePage() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-4/5 border-4 border-blue rounded-2xl mt-10 px-10 py-6 flex flex-col justify-between '>
    
        <h1 className='text-center font-black text-blue text-4xl mb-8'> Usuario</h1>
        <div className='flex justify-between'>

        <div className='flex flex-col justify-center content-between w-fit'>
        

          <h2 className='font-bold'>Cocinas favoritas</h2>
          <h2  className='font-bold'>Ingredientes favoritos</h2>
 
         </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Le ha gustado...</h2>
          <MiniTile type/>
        </div>
        </div>
        <div className='w-fit'>
          <h2 className='font-bold'>Conoce a...</h2>
          <MiniTile/>
        </div>
        <Button style={FAVORITE} display="Añadir a Amigos"/>
    
       </div>
        <Button
        display="Regresar"
        style={BODY}
        //action={() => { navigate(-1); }}
      />
    </div>
  )
}
