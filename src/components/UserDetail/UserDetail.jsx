import React from 'react'
import Button from "../Button/Button.jsx"
import { AUXILIAR } from '../Button/styles.js';
import { RECIPE_DETAILS, USER_DETAILS } from '../URLS.js';


export default function UserDetail({username}) {

        return (
      <div className=" w-[350px] flex flex-col justify-center items-center bg-white  border-4 border-blue  rounded-2xl p-5 gap-3 hover:-translate-y-4 drop-shadow-sm hover:-translate-x-1 hover:drop-shadow-xl transition ease-in-out duration-300 delay-0">
        
        <div className="w-full flex text-center item-center justify-between gap-1">
          <h3 className="font-extrabold text-xl text-blue leading-none">
            @{username}
          </h3>
          <Button display="Look Closer" style={AUXILIAR} to={USER_DETAILS(username)} />
        </div>
      </div>
    );
  
}
