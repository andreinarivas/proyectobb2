import React from 'react'
import Button from "../Button/Button.jsx"
import { AUXILIAR } from '../Button/styles.js';
import { RECIPE_DETAILS } from '../URLS.js';

export default function RecipeDetail({recipe}) {

        return (
      <div className=" w-[350px] flex flex-col justify-center items-center bg-white  border-4 border-blue  rounded-2xl p-5 gap-3 hover:-translate-y-4 drop-shadow-sm hover:-translate-x-1 hover:drop-shadow-xl transition ease-in-out duration-300 delay-0">
        
        <div className="w-full flex text-center flex-col justify-between gap-1">
          <h3 className="font-extrabold text-xl text-blue leading-none">
            {recipe.name}
          </h3>
          <div className="flex flex-col gap-1 leading-none break-words">
            <h6 className="font-semibold whitespace-nowrap text-sm">
              Difficultity: {recipe.skillLevel}
            </h6>
            <div className="font-semibold whitespace-nowrap text-sm">
            Prep Time: {recipe.preparationTime.low}
            </div>
            <div className="font-semibold whitespace-nowrap text-sm">
            Cook Time: {recipe.cookingTime.low}
            </div>
          </div>
          <Button display="Detallar" style={AUXILIAR} to={RECIPE_DETAILS(recipe.id)} />
        </div>
      </div>
    );
  
}
