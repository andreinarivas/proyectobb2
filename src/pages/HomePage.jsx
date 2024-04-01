import React from 'react'
import RecipeDetail from '../components/RecipeDetail/RecipeDetail'

export default function HomePage() {
  return (
    <div className='bg-white px-20 py-16'>
        <h1 className='text-yellow py-8 text-3xl font-bold'>Porque te gusta probar cosas nuevas...</h1>
        <RecipeDetail/>
        <h1 className='text-yellow py-8 text-3xl font-bold'>Prueba con tus amigos !</h1>
    </div>
  )
}
