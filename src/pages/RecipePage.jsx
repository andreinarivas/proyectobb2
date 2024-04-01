import React from 'react'
import Input from '../components/Input/Input'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY, FAVORITE } from '../components/Button/styles'

export default function RecipePage() {
  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='w-4/5 border-4 border-blue rounded-2xl mt-10 px-10 py-6 flex justify-between '>
    <img
          src={
             "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
          }
          className="w-2/5 object-cover rounded-xl"
        />
        <div className='flex flex-col justify-center content-between w-full px-24'>
        <h1 className='text-center font-black text-blue text-4xl mb-8'> NombreReceta</h1>
        <div className='mb-2'>

        <h2 className='font-bold'>Autor</h2>
        <h2  className='font-bold'>Cocina</h2>
        <h2  className='font-bold'>Ingredientes</h2>
        </div>
        
        <Button style={FAVORITE} display="Añadir a Favoritos"/>
        <Button style={AUXILIAR} display="Ver Pagina"/>
        
       
    </div>
    
        </div>
        <Button
        display="Regresar"
        style={BODY}
        //action={() => { navigate(-1); }}
      />
    </div>
  )
}
