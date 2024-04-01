import React from 'react'

export default function MiniTile({type, display}) {
if(type){

    return (
      <div className='bg-blue/15 px-4 py-2 rounded-full text-blue font-bold '>{display}</div>
    )
}else{
    return (
        <div className='bg-yellow/15 px-4 py-2 rounded-full text-yellow font-bold '>{display}</div>
      )
}
}
