import React, {useEffect, useState} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import { searchRecipes } from '../connect/query';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail' 
import UserDetail from '../components/UserDetail/UserDetail';

export default function SearchPage() {
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("")
  const [searched, setSearched] =useState(false);
  const [found, setFound] =useState();

  

  const handleSearch = async(search, filter)=>{
    await searchRecipes(search,filter, setFound)
    setSearched(true);
  }

  const handleFound = ()=>{
    if(searched && found){
      
      return <>
      <div className='px-20 py-16'>
        <h1 className='text-yellow py-8 text-3xl font-bold'>{found.length !== 0 ? 'Results':'No results found'} </h1>
        <div className='flex flex-wrap gap-4 justify-center'>
        
        {found.map((f)=>{
          if(filter!='user'){
            return <RecipeDetail recipe={f}/>
          }else{
            return <UserDetail username={f.username}/>
          }
          
        })}
        </div>
        </div>
      </>
    }
    
    else{
      return<></>
    }
  }

  useEffect(()=>{
    handleFound()
  },[searched])


   return(
    <div>
        <SearchBar filter={filter} setFilter={setFilter} search={search} setSearched={setSearched} handleSearch={handleSearch} setSearch={setSearch}/>
         
          {handleFound()}
        
    </div>
    
  )
}
