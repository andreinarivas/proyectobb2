import React from 'react'

export default function MiniTile({type}) {
if(type){

    return (
      <div className='bg-blue/15 px-4 py-2 rounded-full text-blue font-bold '>MiniRecipe</div>
    )
}else{
    return (
        <div className='bg-yellow/15 px-4 py-2 rounded-full text-yellow font-bold '>MiniRecipe</div>
      )
}
}
