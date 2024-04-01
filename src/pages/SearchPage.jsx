import React from 'react'
import RecipeDetail from '../components/RecipeDetail/RecipeDetail'
import Input from '../components/Input/Input'
import SearchBar from '../components/SearchBar/SearchBar'

export default function SearchPage() {
   return(
    <div>
        <SearchBar/>
        <div className='px-20 py-16'>
        <h1 className='text-yellow py-8 text-3xl font-bold'>Resultados</h1>
        <div className='flex flex-wrap gap-4 justify-center'>

        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        <RecipeDetail/>
        </div>
        </div>
    </div>
    
  )
}
