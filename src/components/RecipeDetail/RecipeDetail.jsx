import React from 'react'
import Button from "../Button/Button.jsx"
import { AUXILIAR } from '../Button/styles.js';

export default function RecipeDetail() {

        return (
      <div className=" w-[350px] flex flex-col justify-center items-center bg-white  border-4 border-blue  rounded-2xl p-5 gap-3 hover:-translate-y-4 drop-shadow-sm hover:-translate-x-1 hover:drop-shadow-xl transition ease-in-out duration-300 delay-0">
        <img
          src={
             "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
          }
          className="h-3/5 object-cover rounded-xl"
        />
        <div className="w-full flex text-center flex-col justify-between gap-1">
          <h3 className="font-extrabold text-xl text-blue leading-none">
            PRUEBA
          </h3>
          <div className="flex flex-col gap-1 leading-none break-words">
            <h6 className="font-semibold whitespace-nowrap text-sm">
              Autor:
            </h6>
            <div className="font-semibold whitespace-nowrap text-sm">
            Cocina:
            </div>
          </div>
          <Button display="Detallar" style={AUXILIAR}  />
        </div>
      </div>
    );
  
}
